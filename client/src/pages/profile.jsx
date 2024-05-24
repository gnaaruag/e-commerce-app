import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import "../styles/profile.css";
import checkUserValidity from "../util/auth-helper";
import sessionClose from "../util/sessionClose";
import { CiUser } from "react-icons/ci";
import sanityClient from '../client';



function Profile() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});

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
        const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userEmail })
        });
        const data = await response.json();
        setOrders(data.orders);

        // Fetch product details for each order
        const productIds = data.orders.map(order => order.productId);
        const query = `*[_type == "product" && productId in $productIds] {
          _id,
          productName,
          mainImage,
          altImage0,
          altImage1,
          altImage2,
          altImage3,
          price,
          productCategory,
          productDescription
        }`;
        const products = await sanityClient.fetch(query, { productIds });
        const productMap = products.reduce((acc, product) => {
          acc[product._id] = product;
          return acc;
        }, {});
        setProducts(productMap);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    checkToken();
    fetchOrders();
  }, [navigate]);

  const handleTokenDismissRequest = () => {
    sessionClose();
    navigate("/");
  };

  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName");

  return (
    <div className="ft-primary txt-primary">
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
            {orders.length === 0 ? (
              <p>You have not placed any orders yet</p>
            ) : (
              <ul>
                {orders.map(order => (
                  <li key={order._id}>
                    <h4>Order ID: {order._id}</h4>
                    <p>Product: {products[order.productId]?.productName || "Loading..."}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <img src={products[order.productId]?.mainImage.asset.url} alt={products[order.productId]?.productName} />
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
}

export default Profile;
