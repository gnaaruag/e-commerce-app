import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";


function KurtasF() {
  const [filterData, setFilterData] = useState(null); // State to store filter data

  // Function to handle filter change
  const handleFilterChange = (data) => {
    setFilterData(data);
  };
  return (
    <div className="sarees">
      <h1 className="ft-primary txt-primary">Salwar Kurta</h1>
      <p className="ft-sec-reg txt-secondary main-p">
        {
          "Ditch the Ordinary, Dress Like Royalty: Dazzling Salwar Kameez Collection. Forget the basic dress code: Unleash your inner fashionista with our breathtaking collection of women's salwar kameez. Each piece is a labor of love, meticulously crafted with exquisite details and luxurious fabrics that will transform you into a vision of elegance."
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

export default KurtasF;
