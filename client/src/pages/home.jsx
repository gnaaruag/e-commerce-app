import "../App.css";
import "../styles/home.css";

function Home() {
  return (
    <>
      <div className="herotext section">
        <h2 className="txt-primary ft-primary">
          Over Hundred Years of Craftsman Perfection
        </h2>
      </div>
      <div className="txt-primary ft-primary section">
        <h3 >Shop by Category</h3>
      </div>
      <div className="txt-primary ft-primary section">
        <h3 >Browse our Collections</h3>
        <p className="subhead">{"Overwhelmed by our options? Don't know where to begin? Start with our curated collections!"}</p>
      </div>
      <div className="txt-primary ft-primary section">
        <h3 >Popular this Month</h3>
      </div>
      <div className="txt-primary ft-primary section">
        <h3 >Explore our Exclusive Collection</h3>
      </div>
    </>
  );
}

export default Home;
