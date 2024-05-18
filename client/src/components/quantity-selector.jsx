import  { useState } from "react";
import "../App.css"
import "../styles/quantity-selector.css"
import { FaPlus, FaMinus } from "react-icons/fa6";


// eslint-disable-next-line react/prop-types
const QuantitySelector = ({ onQuantityChange, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="quantity-selector ft-sec-reg txt-secondary">
      <button  className="txt-secondary" onClick={handleDecrement}><FaMinus/></button>
      <span>{quantity}</span>
      <button className="txt-secondary" onClick={handleIncrement}><FaPlus/></button>
    </div>
  );
};

export default QuantitySelector;
