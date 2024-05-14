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
          <a href="/collections/saree">Saree</a>
          <a href="/collections/lehenga">Lehenga</a>
          <a href="/collections/kurtas-for-her">Kurtas for her</a>
          <a href="/collections/kurtas-for-him">Kurtas for him</a>
          <a href="/collections/gift-sets">{"Men's gift set"}</a>
          
        </div>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <IoMdClose size={30}/>
        </button>
      </nav>

      <div className="icons">
        <a href="/profile"><CiUser className="txt-secondary icon" size={25} /></a>
        <a href="/search"><CiSearch className="txt-secondary icon " size={25} /></a>
        <a href="/cart"><CiShoppingCart className="txt-secondary icon" size={25} /></a>
      </div>
    </header>
  );
}

export default Navbar;
