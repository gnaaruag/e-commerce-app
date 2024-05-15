import { useState } from 'react';
import "../App.css"
import "../styles/filtersort.css"

// eslint-disable-next-line react/prop-types
function FilterSort({ onFilterChange }) {
  const [price, setPrice] = useState(7000);
  const [sortCriteria, setSortCriteria] = useState('');
  const [availability, setAvailability] = useState('available');

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    onFilterChange({ price: event.target.value, availability, sortCriteria });
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
    onFilterChange({ price, availability, sortCriteria: event.target.value });
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
    onFilterChange({ price, availability: event.target.value, sortCriteria });
  };

  return (
    <div className="filtersort ft-primary txt-secondary">
      <div className="filter">
        <div className="mob-club">
		<p>Filter by:</p>
        <div id='availability'>
          <select id="availability" value={availability} onChange={handleAvailabilityChange}>
            <option value="available">In stock</option>
            <option value="not_available">Out of stock</option>
          </select>
        </div>
		</div>
        <div className='p-slider'>
          <label htmlFor="price">Price:</label>
          <input 
            type="range" 
            id="price" 
            name="price" 
            min="0" 
            max="100000" 
            value={price} 
            onChange={handlePriceChange} 
          />
          <span>{"<="} ₹{price}</span> 
        </div>
      </div>
      <div className="sort">
			<p>Sort by:</p>
        <div>
          <select value={sortCriteria} onChange={handleSortChange} id='sort'>
            <option value="">Select</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="featured">Featured</option>
            <option value="price_low_to_high">Price Low to High</option>
            <option value="price_high_to_low">Price High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterSort;
