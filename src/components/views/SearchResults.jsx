import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../config';
import { Col } from 'reactstrap';
import Product from '../common/Product';

const SearchResults = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const searchParams = new URLSearchParams(props.location.search);
  const searchVal = searchParams.get('search');

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/products/search`,
        {
          params: {
            search: searchVal,
          },
        }
      );
      setSearchResults(response.data);
    })();
  }, [searchVal, setSearchResults]);

  const goToProduct = (e) => {
    let productId = e.currentTarget.getAttribute('value');
    props.history.push(`/product/${productId}`);
  };

  return (
    <Col>
      <React.Fragment>
        <div className="product-container">
          {searchResults.map((p) => (
            <Product
              key={p.id}
              id={p.id}
              img_url={p.img_url}
              name={p.name}
              tags={p.tags}
              company={p.company}
              cost={p.cost}
              goToProduct={goToProduct}
            />
          ))}
        </div>
      </React.Fragment>
    </Col>
  );
};

export default SearchResults;
