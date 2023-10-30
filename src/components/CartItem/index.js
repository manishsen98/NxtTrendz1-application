import React from "react";
import "./index.css"
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

const CartItem = (props) => {
  const { cartItemDetails } = props;
  const { title, brand, imageUrl, quantity, price } = cartItemDetails;
  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-brand"> {brand} </p>
          <p className="cart-product-title"> {title} </p>
        </div>

        <div className="cart-quantity-container">
          <button type="button" className="quantity-controller-button">
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity"> {quantity} </p>

          <button type="button" className="quantity-controller-button">
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
       <div className="total-price-delete-container">
       <p className="cart-total-price"> RS {price * quantity} /- </p>
       <button className="remove-button" type="button" >
        Remove
       </button>
       </div>
     </div>
     <button className="delete-button" type="button">  
     <AiFillCloseCircle color="#616E7C" size={20} />
     </button>
    </li>
  );
};

export default CartItem;
