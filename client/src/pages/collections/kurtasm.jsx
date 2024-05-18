import "../../App.css";
import "../../styles/collections.css";
import FilterSort from '../../components/filter-sort'; // Import the FilterSort component
import { useState } from "react";
import DisplayCollection from "../../components/display-collection"


function KurtasM() {
  const [filterData, setFilterData] = useState({minPrice: 0, maxPrice:100000, sortCriteria: "price_low_to_high"}); // State to store filter data

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
      
      

<DisplayCollection collection="mensKurta" minPrice={filterData.minPrice} maxPrice={filterData.maxPrice} sortCriteria={filterData.sortCriteria}/>

    </div>
  );
}

export default KurtasM;
