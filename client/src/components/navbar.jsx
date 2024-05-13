import { useRef } from "react";
import { CiUser, CiSearch, CiShoppingCart } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";


import "../styles/navbar.css";
import "../App.css";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <button className="nav-btn" onClick={showNavbar}>
        <HiBars3 />
      </button>
      <a href="/">
        <img src="/LOGO.png" alt="logo" className="branding" />
      </a>
      <nav ref={navRef} className="ft-sec-reg">
        <div className="links">
          <a href="/#">Saree</a>
          <a href="/#">Lehenga</a>
          <a href="/#">Kurtas for her</a>
          <a href="/#">Kurtas for him</a>
          <a href="/#">{"Men's gift set"}</a>
          <a href="/#" className="hidden-links">
            Search
          </a>
          <a href="/#" className="hidden-links">
            Profile
          </a>
          <a href="/#" className="hidden-links">
            Cart
          </a>
        </div>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <IoMdClose size={30}/>
        </button>
      </nav>

      <div className="icons">
        <CiUser className="txt-secondary icon" size={25} />
        <CiSearch className="txt-secondary " size={25} />
        <CiShoppingCart className="txt-secondary icon" size={25} />
      </div>
    </header>
  );
}

export default Navbar;
