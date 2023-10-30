import { BrowserRouter,Route, Routes } from "react-router-dom";
import {Children, useState} from "react" 
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Cart from "./components/Cart"; 
import "./App.css";
import Products from "./components/Products";
import PrivateComponet from "./components/PrivateComponent";
import NotFound from "./components/NotFound";
import ProductItemDetails from "./components/ProductItemDetails";
import CartContext from "./context/CartContext";

function App(props) {
  const [cartList, setCartList] = useState([])
  const addCartItem = (product) => {
    setCartList((prevCartList) => [...prevCartList, product] )
    console.log(cartList)
  }
  

  return (
    <BrowserRouter>
    <CartContext.Provider 
     value={{cartList, addCartItem}}>
      {props.Children}
   </CartContext.Provider>
    <Routes>
      <Route element = {<PrivateComponet/>}  >
      <Route path="/" element = {<Home />} />
      <Route path = "/cart" element = {<Cart/>} />
      <Route path = "/products" element = {<Products/>} />
      <Route path = "/products/:id" element = {<ProductItemDetails/>  } />
      </Route>
      <Route path="*" element = {<NotFound/>}  />
      <Route path="/login" element = {<LoginForm/>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
