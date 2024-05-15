import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";


function GiftSet() {
  const [filterData, setFilterData] = useState(null); // State to store filter data

  // Function to handle filter change
  const handleFilterChange = (data) => {
    setFilterData(data);
  };
	return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">
        {"Men's Combo Set"}
      </h1>
      <p className="ft-sec-reg txt-secondary main-p">
        {"Elevate the groom's look on his special day with these sophisticated men's combo sets. Crafted from high-quality materials, the set ensures both comfort and a polished appearance, making it the perfect gift for the discerning bridegroom."}
      </p>
      <FilterSort onFilterChange={handleFilterChange} />
      
      {/* Render sarees based on the filterData received */}
      {/* Example: */}
      {filterData && (
        <div>
          Filtered Data:
          <p>Price: {filterData.price}</p>
          <p>Availability: {filterData.availability}</p>
          <p>Sort Criteria: {filterData.sortCriteria}</p>
        </div>
      )}
    </div>
  );
  }
  
  export default GiftSet;