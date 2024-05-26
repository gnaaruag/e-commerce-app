import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection"



function Bridal() {
  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

  const handleFilterChange = (data) => {
    setFilterData(data);
  };
	return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">
        {"Bridal Collection"}
      </h1>
      <p className="ft-sec-reg txt-secondary main-p">
        {"Enhance the bride's elegance on her special day with these exquisite bridal combo sets. Crafted from luxurious materials, each set promises both comfort and a refined appearance, making it the perfect gift for the discerning bride."}
      </p>
      <FilterSort onFilterChange={handleFilterChange} />
      
  
      
      <DisplayCollection collection="bridal" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>
    </div>
  );
  }
  
  export default Bridal;