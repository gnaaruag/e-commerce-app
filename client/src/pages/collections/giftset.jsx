import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection"



function GiftSet() {
  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

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
      
  
      
      <DisplayCollection collection="giftset" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>
    </div>
  );
  }
  
  export default GiftSet;