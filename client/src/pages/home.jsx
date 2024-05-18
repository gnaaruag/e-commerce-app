import "../App.css";
import "../styles/home.css";
import Card from "../components/category-card";
import BrowseCollection from "../components/browse-collection";
import PopularThisMonth from "../components/popular-this-month";
import ExclusiveCollection from "../components/exclusive-collection";
function Home() {
  return (
    <>
      <div className="herotext section">
        <h2 className="txt-primary ft-primary hero">
          Over Hundred Years of Craftsman Perfection
        </h2>
        <p className="ft-primary  subhead">
          Shop for Exclusive Traditional Attire with Ease!
        </p>
        <a href="#categories" className="cta-grp">
          {/* <button className="cta ft-primary">
            View Products <FaArrowRight />
          </button> */}
        </a>
      </div>

      <div className="txt-primary ft-primary section" id="categories">
        <h3 className="home-sec-head">Shop by Category</h3>
        <div className="category-cards">
          <Card imageSrc="/ds2.jpeg" title="Sarees" link="/collections/saree" />
          <Card imageSrc="/ds3.jpeg" title="Lehengas" link="/collections/lehenga" />
          <Card imageSrc="/ds6.jpeg" title="Kurtas for Her" link="/collections/kurtas-for-her" />
          <Card imageSrc="/ds4.jpeg" title="Kurtas for Him" link="/collections/kurtas-for-him" />
          <Card imageSrc="/ds5.jpeg" title="Gift Sets" link="/collections/gift-sets" />
        </div>
      </div>
      <div className="txt-primary ft-primary section">
        <h3 className="home-sec-head">Browse our Collections</h3>
        <p className="subhead">
          {
            "Overwhelmed by our options? Don't know where to begin? Start with our curated collections!"
          }
        </p>
        <BrowseCollection/>
      </div>
      <div className="txt-primary ft-primary section sectionpop">
        <h2 className="pophead">Popular this Month</h2>
        <PopularThisMonth/>
      </div>
      <div className="txt-primary ft-primary section ">
        <h2 className="">Explore our Exclusive Collection</h2>
        <ExclusiveCollection/>
      </div>
    </>
  );
}

export default Home;
