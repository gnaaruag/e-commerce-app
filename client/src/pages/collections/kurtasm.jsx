import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";


function KurtasM() {
  const [filterData, setFilterData] = useState(null); // State to store filter data

  // Function to handle filter change
  const handleFilterChange = (data) => {
    setFilterData(data);
  };
  return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">{"Men's Kurta"}</h1>
      <p className="ft-sec-reg txt-secondary main-p">
        {
          "Craft Your Epic: Men's Kurta Collection for the Storyteller. Weave a tale of style and tradition. Our men's kurta collection is an epic tapestry waiting to be embroidered with your story. Each kurta, meticulously crafted from premium fabrics, is an invitation to express your individuality and cultural heritage with unparalleled confidence."
        }
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

export default KurtasM;
