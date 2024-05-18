import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection";


function Lehenga() {

  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

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
      

      <DisplayCollection collection="lehengas" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>

    </div>
  );
}

export default Lehenga;
