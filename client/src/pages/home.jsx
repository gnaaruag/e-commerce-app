import "../App.css";
import "../styles/home.css"

import ReactTypingEffect from 'react-typing-effect';



function Home() {
  return (
    <div>
      <ReactTypingEffect className="ft-sec-reg txt-primary herotext" 
        text={["Over Hundred Years of Craftsman Perfection..."]}
      />
      
    </div>
  );
}

export default Home;
