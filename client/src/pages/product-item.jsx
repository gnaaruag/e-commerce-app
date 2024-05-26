import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createClient from "../client";
import "../App.css";
import "../styles/product.css";
import QuantitySelector from "../components/quantity-selector";
import Loading from "../components/loading";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

import {
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from "react-share";
import toast, { Toaster } from "react-hot-toast";

import { FaFacebook } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";

const notifyCopy = () =>
  toast("Copied Successfully", {
    style: {
      fontFamily: "toast",
    },
  });

const notifyAddToCart = () =>
  toast.success("Item added to cart", {
    style: {
      fontFamily: "toast",
    },
  });

const ProductItem = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const productUrl = window.location.href;
  
  const handleCopyLink = () => {
    notifyCopy();
    navigator.clipboard.writeText(productUrl);
  };

  useEffect(() => {
    const groqQuery = `*[_type == 'product' && productId.current == "${productId}"][0] {
      productName,
      productId,
      mainImage {
        asset-> {
          url
        }
      },
      altImage0 {
        asset-> {
          url
        }
      },
      altImage1 {
        asset-> {
          url
        }
      },
      altImage2 {
        asset-> {
          url
        }
      },
      altImage3 {
        asset-> {
          url
        }
      },
      price,
      productCategory,
      productDescription
    }`;

    

    const fetchProduct = async () => {
      try {
        const data = await createClient.fetch(groqQuery);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");

    if (!email) {
      toast.error("User email not found in localStorage");
      return;
    }

    if (!token) {
      toast.error("User token not found in localStorage");
      return;
    }

    const addItemPayload = {
      token,
      email,
      productId: productId,
      quantity,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ROUTE}/add-cart-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addItemPayload),
      });

      if (response.ok) {
        notifyAddToCart();
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart");
    }
  };
  const handleBuy = async () => {
    const userEmail = localStorage.getItem("userEmail") || "lorem@ipsum.com";
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ROUTE}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: [product], userEmail }),  
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
    <div>
      <Toaster />
      {product ? (
        <div className="prod-cols">
          <div className="col1">
            <a href={product.mainImage.asset.url} target="_blank" rel="noopener noreferrer">
              <img
                src={product.mainImage.asset.url}
                alt={product.productName}
                className="main-prod"
              />
            </a>
            <div className="altimgs">
              {product.altImage0?.asset?.url && (
                <a href={product.altImage0.asset.url} target="_blank" rel="noopener noreferrer">
                  <img src={product.altImage0.asset.url} alt={product.productName} />
                </a>
              )}
              {product.altImage1?.asset?.url && (
                <a href={product.altImage1.asset.url} target="_blank" rel="noopener noreferrer">
                  <img src={product.altImage1.asset.url} alt={product.productName} />
                </a>
              )}
              {product.altImage2?.asset?.url && (
                <a href={product.altImage2.asset.url} target="_blank" rel="noopener noreferrer">
                  <img src={product.altImage2.asset.url} alt={product.productName} />
                </a>
              )}
              {product.altImage3?.asset?.url && (
                <a href={product.altImage3.asset.url} target="_blank" rel="noopener noreferrer">
                  <img src={product.altImage3.asset.url} alt={product.productName} />
                </a>
              )}
            </div>
          </div>
          <div className="col2">
            <h4 className="ft-primary txt-secondary brand">Dwivedi Sarees</h4>
            <h2 className="ft-primary txt-secondary">{product.productName}</h2>
            <p className="ft-sec-reg txt-secondary price">Rs. {product.price}</p>
            <p className="ft-sec-reg txt-secondary price">Quantity</p>
            <QuantitySelector onQuantityChange={handleQuantityChange} />
            <div className="actions">
              <button
                className="cart ft-sec-reg txt-secondary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="buy ft-sec-reg txt-secondary"
                onClick={handleBuy}
              >
                Buy
              </button>
            </div>
            <p className="ft-sec-reg txt-secondary price">{product.productDescription}</p>
            <div className="share ft-sec-reg txt-secondary">
              <p>Want to share this with friends and family?</p>
              <div className="sh-button">
                <EmailShareButton url={productUrl} subject={product.productName}>
                  <CiMail color="black" className="s-icon" />
                </EmailShareButton>
                <FacebookShareButton url={productUrl}>
                  <FaFacebook color="#0866ff" className="s-icon" />
                </FacebookShareButton>
                <TwitterShareButton url={productUrl} title={product.productName}>
                  <FaXTwitter color="black" className="s-icon" />
                </TwitterShareButton>
                <WhatsappShareButton url={productUrl} title={product.productName}>
                  <FaWhatsapp color="#00d757" className="s-icon" />
                </WhatsappShareButton>
                <button onClick={handleCopyLink}>
                  <BiCopy size={20} color="black" className="s-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductItem;
