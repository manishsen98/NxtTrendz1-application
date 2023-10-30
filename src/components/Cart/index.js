import React from "react";
import Header from "../Header";
import CartListView from "../CartListView"

const Cart = () => {
  return (
    <>
      <Header />
      <div className="cart-container">
        <div className="cart-container-context">
          <h1 className="cart-heading">my cart</h1>
        </div>
      </div>
      <CartListView/>
    </>
  );
};

export default Cart;
