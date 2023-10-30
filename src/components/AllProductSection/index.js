import React, { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import ProductCard from '../ProductCard';
import './index.css';
import { Loading } from 'react-loading-dot'
import ProductsHeader from "../ProductsHeader";


const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
];

function AllProductsSection() {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        setProductsList(updatedData);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, [activeOptionId]);

  const updateActiveOptionId = activeOptionId => {
    setActiveOptionId(activeOptionId);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const renderProductsList = () => (
    <>
      <ProductsHeader
        activeOptionId={activeOptionId}
        sortbyOptions={sortbyOptions}
        updateActiveOptionId={updateActiveOptionId}
      />
      <ul className="products-list">
        {productsList.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </>
  );

  const renderLoader = () => (
    <div className="products-loader-container">
      <Loading />
    </div>
  );

  return isLoading ? renderLoader() : renderProductsList();
}

export default AllProductsSection;