import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Loading } from "react-loading-dot";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import SimilarProductItem from "../SimilarProductItem";
import CartContext from "../../context/CartContext";

import Header from "../Header";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductItemDetails = () => {
 const {addCartItem} = useContext(CartContext)
 console.log(addCartItem)  
 console.log(addCart)
  const { id } = useParams();

  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);

  const getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });
  useEffect(() => {
    const getProductData = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      const jwtToken = Cookies.get("jwt_token");
      const apiUrl = `https://apis.ccbp.in/products/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };

      try {
        const response = await fetch(apiUrl, options);

        if (response.ok) {
          const fetchedData = await response.json();
          const updatedData = getFormattedData(fetchedData);
          const updatedSimilarProductsData = fetchedData.similar_products.map(
            (eachSimilarProduct) => getFormattedData(eachSimilarProduct)
          );
          setProductData(updatedData);
          setSimilarProductsData(updatedSimilarProductsData);
          setApiStatus(apiStatusConstants.success);
        } else if (response.status === 404) {
          setApiStatus(apiStatusConstants.failure);
        }
      } catch (error) {
        setApiStatus(apiStatusConstants.failure);
      }
    };
    getProductData();
  }, [id]);
  const renderLoadingView = () => {
    <div>
      <Loading />
    </div>;
  };

  const renderFailureView = () => {
    <div className="product-details=error-view-container">
      <img
        alt="error-view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        
        Continue Shopping
      </button>
    </div>;
  };

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData;
    return (
      <div className="product-item-details-container">
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-img" />
          <div className="product">
            <h1 className="product-name"> {title} </h1>
            <p className="product-details">RS {price} </p>
            <div className="rating-and-review-container">
              <div className="rating-container">
                <p className="rating"> {rating} </p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="staet"
                  className="star"
                />
              </div>
              <p className="reviews-count"> {totalReviews} </p>
            </div>
            <p className="product-description"> {description} </p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value"> {availability} </p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value"> {brand} </p>
            </div>
            <hr className="horizontal-line" />

            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity"> {quantity} </p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button 
            type="button" 
            className="button add-to-cart-btn"
            onClick={()=>{
             addCartItem({...productData, quantity})
            
            }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar-products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map((eachSimilarProduct) => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
      </div>
    );
  };

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;