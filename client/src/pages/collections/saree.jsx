import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";


function Sarees() {
  const [filterData, setFilterData] = useState(null); // State to store filter data

  // Function to handle filter change
  const handleFilterChange = (data) => {
    setFilterData(data);
  };
  return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">
        Sarees
      </h1>
      <p className="ft-sec-reg txt-secondary main-p">Explore a World of Elegance: Sarees for Every Occasion. Discover a captivating collection of sarees, designed to grace every moment, from the grand aisle to everyday soirees. Whether you seek the timeless elegance of a bridal saree, the vibrant energy of partywear, or the effortless charm of everyday sarees, our diverse selection offers something for every woman.</p>
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

export default Sarees;
