import "../styles/pay.css"
import "../App.css"
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/profile');
    };

    return (
		<div className="container failure ft-sec-reg">
		<div className="icon">❌</div>
		<div className="message">Payment Failed</div>
		<div className="details">Unfortunately, your payment could not be processed. Please try again or contact support.</div>
		<button onClick={handleRedirect}>Return to Cart</button>
	</div>
    );
};

export default PaymentFailure;
