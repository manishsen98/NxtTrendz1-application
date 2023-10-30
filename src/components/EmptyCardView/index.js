import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const EmptyCardView = () => {
  <div className="card-empty-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="cart-empty-view"
      alt="cart empty"
    />
    <h1>Your card is Empty</h1>
    <Link to="/products">
      <button type="submit" className="show-now-btn">
        shop now
      </button>
    </Link>
  </div>;
};

export default EmptyCardView;
