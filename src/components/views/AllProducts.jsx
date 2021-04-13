import React, { useState, useEffect } from 'react';
import Context from '../../Context';
import RenderProducts from './RenderProducts';
import axios from 'axios';
import loadingImage from '../../rolling.svg';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'https://5e88f940fe8d.ngrok.io/api/products'
      );
      console.log(response.data);
      setProducts(response.data);
      setLoaded(true);
    };
    fetch();
  }, []);

  //Context
  const context = {
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
    addToCart: (productId) => {
      alert('Adding to Cart:  ' + productId);
    },
  };

  return (
    <React.Fragment>
      {/* {loaded === false && (
        <img
          className="loading-image"
          src={loadingImage}
          alt="Loading spinner"
        />
      )} */}
      <div style={{ height: '100vh' }}>
        <Context.Provider value={context}>
          <RenderProducts />
        </Context.Provider>
      </div>
    </React.Fragment>
  );
};

export default AllProducts;
