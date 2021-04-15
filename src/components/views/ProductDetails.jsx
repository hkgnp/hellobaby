import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config } from '../../config';

const ProductDetails = () => {
  const BASE_URL = config.BASE_URL;
  const productId = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1
  );
  const [product, setProduct] = useState('');

  useEffect(() => {
    (async () => {
      const response = await axios.get(BASE_URL + '/api/products/' + productId);
      setProduct(response.data);
    })();
  });

  return (
    <React.Fragment>
      <h1>{product.name}</h1>

      {product.name}
    </React.Fragment>
  );
};

export default ProductDetails;
