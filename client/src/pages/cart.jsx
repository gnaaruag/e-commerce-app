import { useEffect, useState } from "react";
import createClient from "../client";
import "../App.css";
import "../styles/cart.css";
import { IoTrashBinOutline } from "react-icons/io5";
import QuantitySelector from "../components/quantity-selector";
import Loading from "../components/loading";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");
  console.log(cartItems);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_ROUTE}/get-cart-items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, email }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Error fetching cart items");
      }
    };

    fetchCartItems();
  }, [email, token]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_ROUTE}/get-cart-items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, email }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCartItems(data);

        const productDetails = await Promise.all(
          data.map(async (item) => {
            const groqQuery = `*[_type == 'product' && productId.current == "${item.productId}"][0] {
              productName,
              mainImage {
                asset-> {
                  url
                }
              },
              price
            }`;

            try {
              const product = await createClient.fetch(groqQuery);
              return {
                ...item,
                ...product,
              };
            } catch (error) {
              console.error(
                `Error fetching details for product ${item.productId}:`,
                error
              );
              return { ...item };
            }
          })
        );

        setProducts(productDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Error fetching cart items");
      }
    };

    fetchCartItems();
  }, [email, token]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ROUTE}/edit-cart-item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            email,
            productId,
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, quantity: newQuantity }
            : product
        )
      );

      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating quantity");
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ROUTE}/delete-cart-item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, email, productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== productId)
      );

      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item");
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
	const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ROUTE}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products, userEmail }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id: sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout");
    }
  };

  
  return (
    <div className="ft-primary txt-primary">
      <Toaster />
      <div className="cart-header">
        <h2>Items in your cart</h2>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="cart-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.productId} className="cart-item">
                <img
                  src={product.mainImage?.asset?.url}
                  alt={product.productName}
                />
                <div className="cart-item-details">
                  <div className="info">
                    <h3>{product.productName}</h3>
                    <p>Price: Rs. {product.price}</p>
                  </div>
                  <div className="utility">
                    <p>Quantity:</p>
                    <QuantitySelector
                      className="selector"
                      initialQuantity={product.quantity}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(product.productId, newQuantity)
                      }
                    />
                    <button
                      className="delete"
                      onClick={() => handleDeleteItem(product.productId)}
                    >
                      <IoTrashBinOutline color="#fa6355" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
      {!loading && products.length > 0 && (
        <div className="cart-summary">
          <h3>Total: Rs. {calculateTotal()}</h3>
          <button className="proceed-checkout" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
