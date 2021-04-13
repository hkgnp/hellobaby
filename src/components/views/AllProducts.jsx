import React, { useState, useEffect } from 'react';
import Context from '../../Context';
import RenderProducts from './RenderProducts';
import axios from 'axios';

const AllProducts = () => {
  // States
  // const [services] = useState({
  //   services: [
  //     { id: 1, name: 'Test 1' },
  //     { id: 2, name: 'test 2' },
  //   ],
  // });
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState({ pageSize: 1 });
  const [currentPage, setCurrentPage] = useState({ currentPage: 1 });
  const [loaded, setLoaded] = useState({ loaded: false });

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'https://5e88f940fe8d.ngrok.io/api/products'
      );
      setProducts(response.data);
    };
    fetch();
  }, []);

  //Context
  const context = {
    products: () => {
      return products;
    },
    pageSize: () => {
      return pageSize.pageSize;
    },
    currentPage: () => {
      return currentPage.currentPage;
    },
    managePageChange: (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    },
    bookService: (serviceId) => {
      alert('Booking ' + serviceId);
    },
  };

  return (
    <React.Fragment>
      <div style={{ height: '100vh' }}>
        <Context.Provider value={context}>
          <RenderProducts />
        </Context.Provider>
      </div>
    </React.Fragment>
  );
};

export default AllProducts;
