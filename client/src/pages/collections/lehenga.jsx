import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";


function Lehenga() {

  const [filterData, setFilterData] = useState(null); // State to store filter data

  // Function to handle filter change
  const handleFilterChange = (data) => {
    setFilterData(data);
  };
  return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">Lehenga</h1>
      <p className="ft-sec-reg txt-secondary main-p">
        Immerse yourself in the vibrant world of Indian elegance with our
        exquisite collection of lehengas. Each lehenga is a masterpiece, crafted
        with intricate details and luxurious fabrics to make you feel like
        royalty on your special occasion.
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

export default Lehenga;
