import "../App.css";
import "../styles/footer.css"
import { FaInstagram } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { FaApplePay } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";

function Footer() {
  return (
    <div className="ft-primary">
      <br />
      <div className="links-ft ft-sec-reg ">
        <a href="/search">Search</a>
        <a href="/contact">Contact</a>
        <a href="/returns-refunds">Terms of Service</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      <div className="socials">
        <a href="https://www.instagram.com/dwivedisarees/" target="_blank">
          <FaInstagram size={30} className="txt-secondary"/>
        </a>
      </div>
      <br />
      <div className="pay">
        <SiAmericanexpress size={30}/>
        <FaApplePay size={30}/>
        <FaCcMastercard size={30}/>
        <RiVisaFill size={30}/>
      </div>
      <div className="cred">
      <div><p className="cred">Made for Dwivedi Sarees by <a href="https://github.com/gnaaruag" target="_blank">
          Gaurang Ratnaparkhi
        </a> | © 2024, Dwivedi Sarees</p>        
      </div>
    </div>
    </div>
  );
}
export default Footer;
