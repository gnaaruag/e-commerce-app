import "../../App.css";
import "../../styles/collections.css";
import FilterSort from "../../components/filter-sort"; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection"
function Sarees() {
  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

  // Function to handle filter change
  const handleFilterChange = (data) => {
    setFilterData(data);
  };

  return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">Sarees</h1>
      <p className="ft-sec-reg txt-secondary main-p">
        Explore a World of Elegance: Sarees for Every Occasion. Discover a
        captivating collection of sarees, designed to grace every moment, from
        the grand aisle to everyday soirees. Whether you seek the timeless
        elegance of a bridal saree, the vibrant energy of partywear, or the
        effortless charm of everyday sarees, our diverse selection offers
        something for every woman.
      </p>
      <FilterSort onFilterChange={handleFilterChange} />

      

      <DisplayCollection collection="sarees" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>
    </div>
  );
}

export default Sarees;
