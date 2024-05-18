import { useState } from "react";
import sanityClient from "../client";
import "../App.css";
import "../styles/display-collection.css";
import "../styles/search.css";
import Loading from "../components/loading";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const query = `*[_type == "product" && productName match "${searchTerm}*"]{
      productName,
      "productId": productId.current,
      mainImage {
        asset-> {
          url
        }
      },
      price
    }`;

    try {
      const data = await sanityClient.fetch(query);
      setResults(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="txt-primary ft-primary s-card">
      <h2>Search</h2>
      <div className="search-input-container">
        <input
          type="text"
          className="ft-sec-reg txt-primary"
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="search-button">
              <CiSearch color="#ec8383"/>
            </button>
        {searchTerm && (
            <button onClick={handleClearSearch} className="clear-search-button search-button">
              <IoMdCloseCircleOutline color="#ec8383"/>
            </button>
            
        )}
      </div>

      <div className="search-results">
        {loading ? (
          <Loading />
        ) : (
          results.map((product) => (
            <div key={product.productId} className="coll-item">
              <a href={"/product/" + product.productId}>
                <img
                  src={product.mainImage.asset.url}
                  alt={product.productName}
                />
                <div className="coll-item-desc">
                  <h3 className="ft-primary txt-secondary">
                    {product.productName}
                  </h3>
                  <p className="txt-primary">Price: ₹{product.price}</p>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
