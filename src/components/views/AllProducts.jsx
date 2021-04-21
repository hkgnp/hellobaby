import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Input } from 'reactstrap';
import { config } from '../../config';
import { ProductContext } from '../../Context';
import RenderProducts from './RenderProducts';
import axios from 'axios';
import loadingImage from '../../rolling.svg';

const AllProducts = (props) => {
  // States
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
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

  const setResultsPerPage = (e) => {
    if (e.target.value === '') {
      return;
    } else {
      setPageSize(e.target.value);
    }
  };

  return (
    <Col>
      <div className="text-center">
        {!loaded && (
          <img
            className="loading-image"
            src={loadingImage}
            alt="Loading spinner"
          />
        )}
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <small className="text-muted">Showing {products.length} products</small>
        <div className="d-flex flex-row align-items-center justify-content-end">
          <smalL>Results/page:</smalL>
          <FormGroup className="my-0 ml-2">
            <Input
              style={{ fontSize: '12px' }}
              className="m-0 p-0"
              type="select"
              name="setFilter"
              onChange={setResultsPerPage}
            >
              <option value="">Per Page</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </Input>
          </FormGroup>
        </div>
      </div>
      <ProductContext.Provider value={productContext}>
        {loaded && <RenderProducts />}
      </ProductContext.Provider>
    </Col>
  );
};

export default AllProducts;
