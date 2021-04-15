import React, { useState, useEffect } from 'react';
import { config } from '../../config';
import { ProductContext } from '../../Context';
import RenderProducts from './RenderProducts';
import axios from 'axios';
import loadingImage from '../../rolling.svg';

const AllProducts = () => {
  const BASE_URL = config.BASE_URL;
  // States
  const [products, setProducts] = useState([]);
  const [pageSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  // Load all posts
  useEffect(() => {
    (async () => {
      const response = await axios.get(BASE_URL + '/api/products');
      setProducts(response.data);
      setLoaded(true);
    })();
  });

  //Context
  const productContext = {
    products: () => {
      return products;
    },
    pageSize: () => {
      return pageSize;
    },
    currentPage: () => {
      return currentPage;
    },
    managePageChange: (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    },
    addToCart: (productId, username, userId) => {
      alert('Adding to Cart:  ' + productId + ' by ' + username + '' + userId);
    },
  };

  return (
    <React.Fragment>
      {loaded === false && (
        <img
          className="loading-image"
          src={loadingImage}
          alt="Loading spinner"
        />
      )}
      <div style={{ height: '100vh' }}>
        <ProductContext.Provider value={productContext}>
          <RenderProducts />
        </ProductContext.Provider>
      </div>
    </React.Fragment>
  );
};

export default AllProducts;
