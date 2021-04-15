import React, { useState, useEffect } from 'react';
import { config } from '../../config';
import { ProductContext } from '../../Context';
import RenderProducts from './RenderProducts';
import axios from 'axios';
import loadingImage from '../../rolling.svg';

const AllProducts = (props) => {
  const BASE_URL = config.BASE_URL;

  // States
  const [products, setProducts] = useState([]);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  // Load all posts
  useEffect(() => {
    (async () => {
      const response = await axios.get(BASE_URL + '/api/products');
      setProducts(response.data);
      setLoaded(true);
    })();
  }, [BASE_URL]);

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
    goToProduct: (productId) => {
      alert('Going to Product ID:  ' + productId);
      props.history.push(`/product/${productId}`);
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
      <ProductContext.Provider value={productContext}>
        <RenderProducts />
      </ProductContext.Provider>
    </React.Fragment>
  );
};

export default AllProducts;
