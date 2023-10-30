import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css"
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    
    navigate("/login")
    
  }
  return(
    <nav className="nav-header">
    <div className="nav-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="website-logo"
        alt="website-logo"
      />
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link">
            products
          </Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </li>
      </ul>
      <button className="logout-desktop-btn" onClick={onClickLogout} > Logout </button>
      <button className="logout-mobile-btn" onClick={onClickLogout}  >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
          className="logout-icon"
          alt="logout-icon"
        />
      </button>
    </div>
  </nav>
  )
}

export default Header;
