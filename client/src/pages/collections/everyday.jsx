import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection"



function Everyday() {
  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

  const handleFilterChange = (data) => {
    setFilterData(data);
  };
	return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">
        {"The Everyday Collection"}
      </h1>
      <p className="ft-sec-reg txt-secondary main-p">
        {"Elevate your everyday style with these versatile pieces. Crafted from high-quality materials, ensuring both comfort and a polished appearance, making it the perfect choice for anyone."}
      </p>
      <FilterSort onFilterChange={handleFilterChange} />
      
  
      
      <DisplayCollection collection="everyday" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>
    </div>
  );
  }
  
  export default Everyday;