import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createClient from "../client";
import "../App.css";
import "../styles/product.css";
import QuantitySelector from "../components/quantity-selector";
import Loading from "../components/loading";
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

const notify = () =>
  toast("Copied Successful", {
    style: {
      fontFamily: "toast",
    },
  });

const ProductItem = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams(); // Extract productId from the dynamic route
  const [quantity, setQuantity] = useState(1);
  console.log(quantity);
  const productUrl = window.location.href;
  const handleCopyLink = () => {
    notify();
    navigator.clipboard.writeText(productUrl);
  };
  useEffect(() => {
    // Construct the GROQ query to fetch product data by productId
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

    // Fetch product data using GROQ query
    const fetchProduct = async () => {
      try {
        const data = await createClient.fetch(groqQuery);
        console.log(data);
        // Update the state with the fetched product content
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); // Reset product state if error occurs
      }
    };

    fetchProduct(); // Call the fetchProduct function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]); // Re-run effect when productId changes

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div>
      <Toaster />

      {product ? (
        <div className="prod-cols">
          <div className="col1">
            <a href={product.mainImage.asset.url} target="_blank">
              <img
                src={product.mainImage.asset.url}
                alt={product.productName}
                className="main-prod"
              />
            </a>
            <div className="altimgs">
              <a href={product.altImage0.asset.url} target="_blank">
                <img
                  src={product.altImage0.asset.url}
                  alt={product.productName}
                />
              </a>
              <a href={product.altImage1.asset.url} target="_blank">
                <img
                  src={product.altImage1.asset.url}
                  alt={product.productName}
                />
              </a>
              <a href={product.altImage2.asset.url} target="_blank">
                <img
                  src={product.altImage2.asset.url}
                  alt={product.productName}
                />
              </a>
              <a href={product.altImage3.asset.url} target="_blank">
              <img
                src={product.altImage3.asset.url}
                alt={product.productName}
              />
              </a>
            </div>
          </div>
          <div className="col2">
            <h4 className="ft-primary txt-secondary brand">Dwivedi Sarees</h4>
            <h2 className="ft-primary txt-secondary">{product.productName}</h2>
            <p className="ft-sec-reg txt-secondary price">
              Rs. {product.price}
            </p>
            <p className="ft-sec-reg txt-secondary price">Quantity</p>
            <QuantitySelector onQuantityChange={handleQuantityChange} />
            <div className="actions">
              <button
                className="cart ft-sec-reg txt-secondary"
                onClick={() => console.log("Add to cart clicked")}
              >
                Add to Cart
              </button>
              <button
                className="buy ft-sec-reg txt-secondary"
                onClick={() => console.log("Buy clicked")}
              >
                Buy
              </button>
            </div>
            <p className="ft-sec-reg txt-secondary price">
              {product.productDescription}
            </p>
            <div className="share ft-sec-reg txt-secondary">
              <p>Want to share this with friends and family?</p>
              <div className="sh-button">
                <div className="sh-button">
                  <EmailShareButton
                    url={productUrl}
                    subject={product.productName}
                  >
                    <CiMail color="black" className="s-icon" />
                  </EmailShareButton>
                  <FacebookShareButton url={productUrl}>
                    <FaFacebook color="#0866ff" className="s-icon" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={productUrl}
                    title={product.productName}
                  >
                    <FaXTwitter color="black" className="s-icon" />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={productUrl}
                    title={product.productName}
                  >
                    <FaWhatsapp color="#00d757" className="s-icon" />
                  </WhatsappShareButton>
                  <button onClick={handleCopyLink}>
                    <BiCopy size={20} color="black" className="s-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  );
};

export default ProductItem;
