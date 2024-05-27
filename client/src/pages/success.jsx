import "../styles/pay.css"
import "../App.css"

import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/profile');
    };

    return (
        <div className="container success ft-sec-reg">
            <div className="icon">✔️</div>
            <div className="message">Payment Successful</div>
            <div className="details">Thank you for your payment. Your transaction has been completed successfully. We will send you a confirmation email soon.</div>
            <button onClick={handleRedirect}>Go to Profile</button>
        </div>
    );
};

export default PaymentSuccess;
