import { useState, useEffect } from "react";
import createClient from "../client";
import "../App.css";
import "../styles/popular.css";
import { FaArrowRight } from "react-icons/fa6";


function PopularThisMonth() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const data = await createClient.fetch(`
          *[_type == 'popularThisMonth'] {
            productName,
            "product": *[_id == ^.product._ref][0] {
              productName,
              mainImage,
              price,
			  productId
            }
          }
        `);

        const formattedProducts = await Promise.all(
          data.map(async (entry) => {
            const product = entry.product;
            if (
              product.mainImage &&
              product.mainImage.asset &&
              product.mainImage.asset._ref
            ) {
              const assetData = await createClient.fetch(
                `*[_id == '${product.mainImage.asset._ref}']{url}`
              );
              if (assetData.length > 0) {
                product.mainImage = assetData[0].url;
              }
            }
            return product;
          })
        );

        setProducts(formattedProducts.filter((product) => product.mainImage));
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="productscontainer">
      <div className="productitem">
        {products.map((product, index) => (
          <div key={index} className="product-pop">
            <img src={product.mainImage} alt={product.productName} />
            <div className="prod-desc">
              <h3>{product.productName}</h3>
              <a href={"/products/" + product.productId}>Buy Now <FaArrowRight /> </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularThisMonth;
