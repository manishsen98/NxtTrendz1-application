import  { createContext } from "react";

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
});

export default CartContext;
