/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import sanityClient from "../client";
import "../styles/display-collection.css";
import "../App.css";
import { IoChevronForwardSharp } from "react-icons/io5";

function DisplayCollection({ collection, minPrice, maxPrice, sortCriteria }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product" && productCategory == "${collection}" && price >= ${minPrice} && price <= ${maxPrice}] {
          productName,
          productId{current},
          mainImage {
            asset-> {
              url
            }
          },
          price
        }`;

        const data = await sanityClient.fetch(query);
        const sortedProducts = sortProducts(data, sortCriteria);
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [collection, minPrice, maxPrice, sortCriteria]);

  const sortProducts = (products, sortCriteria) => {
    switch (sortCriteria) {
      case "a-z":
        return [...products].sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
      case "z-a":
        return [...products].sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
      case "price_high_to_low":
        return [...products].sort((a, b) => b.price - a.price);
      case "price_low_to_high":
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const renderPagination = () => {
    const visiblePages = [];
    const maxVisiblePages = 6;
    const middlePage = Math.ceil(maxVisiblePages / 2);
    const startPage = Math.max(1, currentPage - middlePage + 1);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return (
      <div className="pagination ft-sec-reg txt-secondary">
        {currentPage > 1 && (
          <>
            <button
              onClick={() => paginate(1)}
              className="ft-sec-reg txt-secondary"
            >
              1
            </button>
            {currentPage > 4 && <span>...</span>}
          </>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={
              currentPage === page
                ? "active curr-page ft-sec-reg txt-secondary" 
                : "ft-sec-reg txt-secondary"
            }
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <>
            {currentPage < totalPages - 3 && <span>...</span>}
            <button
              className="ft-sec-reg txt-secondary"
              onClick={() => paginate(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          <IoChevronForwardSharp color="e65656" />
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="collitems">
        {products
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => (
            <div key={product.productId.current} className="coll-item">
              <a href={"/product/" + product.productId.current}>
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
          ))}
      </div>
      <div className="pag-comp">{renderPagination()}</div>
    </div>
  );
}

export default DisplayCollection;
