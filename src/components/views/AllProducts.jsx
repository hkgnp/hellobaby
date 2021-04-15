import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { config } from '../../config';
import { ProductContext } from '../../Context';
import RenderProducts from './RenderProducts';
import axios from 'axios';
import loadingImage from '../../rolling.svg';

const AllProducts = (props) => {
  // States
  const [products, setProducts] = useState([]);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  // Load all posts
  useEffect(() => {
    (async () => {
      const response = await axios.get(config.BASE_URL + '/api/products');
      setProducts(response.data);
      setLoaded(true);
    })();
  }, []);

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
      props.history.push(`/product/${productId}`);
    },
  };

  return (
    <Col>
      <div className="text-center">
        {loaded === false && (
          <img
            className="loading-image"
            src={loadingImage}
            alt="Loading spinner"
          />
        )}
      </div>
      <ProductContext.Provider value={productContext}>
        {loaded === true && <RenderProducts />}
      </ProductContext.Provider>
    </Col>
  );
};

export default AllProducts;
