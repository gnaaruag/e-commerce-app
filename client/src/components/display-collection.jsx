import { useEffect, useState } from "react";
import sanityClient from "../client";
import "../styles/display-collection.css"
import "../App.css"

// eslint-disable-next-line react/prop-types
function DisplayCollection({ collection, minPrice, maxPrice, sortCriteria }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Define the GROQ query to fetch products based on the given collection and price range
    const query = `*[_type == "product" && productCategory == "${collection}" && price >= ${minPrice} && price <= ${maxPrice}] {
      productName,
      productId{current},
      mainImage {
        asset-> {
          url
        }
      },
      price,
    }`;

    // Fetch products from Sanity using the defined query
    sanityClient
      .fetch(query)
      .then((data) => {
        // Sort products based on the specified criteria
        const sortedProducts = sortProducts(data, sortCriteria);
        setProducts(sortedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [collection, minPrice, maxPrice, sortCriteria]);

  // Function to sort products based on the specified criteria
  const sortProducts = (products, sortCriteria) => {
    switch (sortCriteria) {
      case "a-z":
        return [...products].sort((a, b) => a.productName.localeCompare(b.productName));
      case "z-a":
        return [...products].sort((a, b) => b.productName.localeCompare(a.productName));
      case "price_high_to_low":
        return [...products].sort((a, b) => b.price - a.price);
      case "price_low_to_high":
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  return (
    <div className="collitems ">
      {products.map((product) => (
        <div key={product.productId.current} className="coll-item">
          <a href={"/product/"+product.productId.current}>
            <img src={product.mainImage.asset.url} alt={product.productName} />
            <div className="coll-item-desc">
              <h3 className="ft-primary txt-secondary">{product.productName}</h3>
              <p className="txt-primary">Price: ₹{product.price}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default DisplayCollection;
