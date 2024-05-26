import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import "../styles/profile.css";
import checkUserValidity from "../util/auth-helper";
import sessionClose from "../util/sessionClose";
import { CiUser } from "react-icons/ci";
import createClient from "../client";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/loading";

const Profile = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await checkUserValidity();
        if (!token.valid) {
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error checking user validity:", error);
        navigate("/signin");
      }
    };

    const fetchOrders = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const response = await fetch(
          `${import.meta.env.VITE_API_ROUTE}/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);

        const orderDetails = await Promise.all(
          data.orders.map(async (order) => {
            const groqQuery = `*[_type == 'product' && productId.current == "${order.productId}"][0] {
              _id,
              productName,
              mainImage {
                asset-> {
                  url
                }
              },
              price,
              productDescription,
              productId
            }`;

            try {
              const product = await createClient.fetch(groqQuery);
              return {
                ...order,
                ...product,
              };
            } catch (error) {
              console.error(
                `Error fetching details for product ${order.productId}:`,
                error
              );
              return { ...order };
            }
          })
        );

        setOrders(orderDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders");
      }
    };

    checkToken();
    fetchOrders();
  }, [navigate]);

  const handleTokenDismissRequest = () => {
    sessionClose();
    navigate("/");
  };

  const username = localStorage.getItem("userName");

  return (
    <div className="ft-primary txt-primary">
      <Toaster />
      <div className="profile">
        <h1 className="prfile">Welcome to your profile!</h1>
        <div className="profile-container">
          <div className="account">
            <h3>Account</h3>
            <button
              className="txt-ternary ft-sec-reg logout"
              onClick={handleTokenDismissRequest}
            >
              <CiUser />
              Logout
            </button>
            <h3>Order History</h3>
            {loading ? (
              
              <Loading/>
            ) : orders.length === 0 ? (
              <p>You have not placed any orders yet</p>
            ) : (
              <ul className="product-list txt-secondary">
                {orders.map((order) => (
                  <li key={order._id} className="txt-secondary">
                    <a href={"/product/" + order.productId.current}>
                      <div className="single-listing">
                        {order.mainImage && (
                          <img
                            src={order.mainImage.asset.url}
                            alt={order.productName}
                          />
                        )}
                      </div>
                      <div>
                        <p className="txt-secondary href">{order.productName || "Loading..."}</p>
                        <p className="txt-secondary">Quantity: {order.quantity}</p>
                        <p className="txt-secondary">
                          Order Date:{" "}
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="details">
            <h4>Your details</h4>
            <p className="ft-sec-reg">{username}</p>
            <p className="ft-sec-reg">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
