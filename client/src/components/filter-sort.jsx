/* eslint-disable react/prop-types */
import { useState } from 'react';
import "../App.css";
import "../styles/filtersort.css";

function FilterSort({ onFilterChange }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortCriteria, setSortCriteria] = useState('');
  const [availability, setAvailability] = useState('available');

  const handleMinPriceChange = (event) => {
    const newMinPrice = parseInt(event.target.value);
    setMinPrice(newMinPrice);
    onFilterChange({ minPrice: newMinPrice, maxPrice, availability, sortCriteria });

  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = parseInt(event.target.value);
    setMaxPrice(newMaxPrice);
    onFilterChange({ minPrice, maxPrice: newMaxPrice, availability, sortCriteria });
  };

  const handleSortChange = (event) => {
    const newSortCriteria = event.target.value;
    setSortCriteria(newSortCriteria);
    onFilterChange({ minPrice, maxPrice, availability, sortCriteria: newSortCriteria });
  };

  const handleAvailabilityChange = (event) => {
    const newAvailability = event.target.value;
    setAvailability(newAvailability);
    onFilterChange({ minPrice, maxPrice, availability: newAvailability, sortCriteria });
  };

  return (
    <div className="filtersort ft-sec-reg txt-secondary">
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
          <label htmlFor="minPrice">Choose Price Range:</label>
          <div>
          <span>₹</span>
          <input 
            type='number'
            id="minPrice" 
            name="minPrice" 
            min="0" 
            max={maxPrice} 
            value={minPrice} 
            onChange={handleMinPriceChange} 
            placeholder='from'
          />
          </div>
          <div>
          <span>{"₹"}</span>
          <input 
            id="maxPrice" 
            type='number'
            name="maxPrice" 
            min={minPrice} 
            max="100000" 
            value={maxPrice} 
            onChange={handleMaxPriceChange} 
            placeholder='to'
          />
          </div>
        </div>
      </div>
      <div className="sort">
        <p>Sort by:</p>
        <div>
          <select value={sortCriteria} onChange={handleSortChange} id='sort'>
            <option value="">Select</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="price_low_to_high">Price Low to High</option>
            <option value="price_high_to_low">Price High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterSort;
