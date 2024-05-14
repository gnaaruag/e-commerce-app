import  { useState, useEffect } from 'react';
import createClient from '../client';

function PopularThisMonth() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        // Fetch popular products data from Sanity
        const data = await createClient.fetch(`
          *[_type == 'popularThisMonth'][0].products[]->{productName, mainImage, _id}
        `);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div>
      <h2>Popular This Month</h2>
      <div className="products-container">
        {products.map(product => (
          <div key={product._id} className="product">
            {product.mainImage && product.mainImage.asset && (
              <img src={product.mainImage.asset.url} alt={product.productName} />
            )}
            <p>{product.productName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularThisMonth;
