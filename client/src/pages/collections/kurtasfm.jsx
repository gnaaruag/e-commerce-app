import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection"



function KurtasF() {
  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

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


<DisplayCollection collection="salwarKurta" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>
    </div>
  );
}

export default KurtasF;
