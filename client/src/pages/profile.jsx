import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/profile.css";
import checkUserValidity from "../util/auth-helper";
import sessionClose from "../util/sessionClose";
import { useEffect } from "react";
import { CiUser } from "react-icons/ci";

function Profile() {
  // Check if token exists in localStorage
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await checkUserValidity();
        if (!token.valid) {
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error checking user validity:", error);
        navigate("/signin");
      }
    };

    checkToken();
  }, [navigate]);
  const handleTokenDismissRequest = () => {
    sessionClose();
    navigate("/");
  };
  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName")

  // If token exists, render Profile component, else redirect to login page
  return (
    <div className="ft-primary txt-primary">
      <div className="prfile">
        <h1>Welcome to your profile!</h1>
		<div className="profile-container"><div className="account">
          <h3>Account</h3>
          <button
            className="txt-ternary ft-sec-reg logout"
            onClick={handleTokenDismissRequest}
          >
            <CiUser />
            Logout
          </button>
          <h3>Order History</h3>
          <p>You have not placed any order yet </p>
        </div>
        <div className="details">
			<h4>Your details</h4>
			<p className="ft-sec-reg">{username}</p>
			<p className="ft-sec-reg">{email}</p>
		</div></div>
        
      </div>
    </div>
  );
}

export default Profile;
