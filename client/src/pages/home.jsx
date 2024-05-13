import "../App.css";
import "../styles/home.css"

import Navbar from "../components/navbar";
import OfferCard from "../components/offer-card";
import ReactTypingEffect from 'react-typing-effect';



function Home() {
  return (
    <div>
      <OfferCard/>
      <Navbar/>
      <ReactTypingEffect className="ft-sec-reg txt-primary herotext" 
        text={["Over Hundred Years of Craftsman Perfection..."]}
      />
      
    </div>
  );
}

export default Home;
