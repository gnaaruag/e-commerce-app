import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection"



function Party() {
  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

  const handleFilterChange = (data) => {
    setFilterData(data);
  };
	return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">
        {"Partywear Collection"}
      </h1>
      <p className="ft-sec-reg txt-secondary main-p">
        {"Shine at any event with these stunning partywear. Crafted from premium materials, each piece guarantees both comfort and a dazzling appearance, making it the perfect choice for the partygoer."}
      </p>
      <FilterSort onFilterChange={handleFilterChange} />
      
  
      
      <DisplayCollection collection="partywear" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>
    </div>
  );
  }
  
  export default Party;