import "../App.css";
import "../styles/browsecollection.css";
import { FaArrowRight } from "react-icons/fa6";

function BrowseCollection() {
  return (
    <div className="coll-comp">
      <div className="col1-coll">
        <div className="b-item bi1">
          <a href="/collections/bridal">
            <img src="/Lehenga_saree.webp" alt="" />
            <p>
              Bridal Wear <FaArrowRight />
            </p>
          </a>
        </div>
      </div>
      <div className="col2-coll ">
        <div className="b-item ">
          <a href="/collections/partywear">
            <img src="/partywear.webp" alt="" />
            <p>
              Party wear <FaArrowRight />
            </p>
          </a>
        </div>
        <div className="b-item ">
          <a href="/collections/everyday">
            <img src="/DSC_1607.webp" alt="" />
            <p>
              Everyday <FaArrowRight />
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BrowseCollection;
