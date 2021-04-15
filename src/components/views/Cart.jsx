import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { config } from '../../config';
import { UserContext } from '../../Context';
import { Col, Row } from 'reactstrap';
import loadingImage from '../../rolling.svg';

const Cart = () => {
  const userContext = useContext(UserContext);

  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/cart/${userContext.user().id}`
      );
      setCart(response.data);
      setLoaded(true);
      console.log(response.data.allItems);
    })();
  }, [userContext]);

  const getTotalCost = () => {
    let totalCost = cart.allItems.map(
      (p) => (p.products.cost * p.quantity) / 100
    );
    return totalCost.reduce((a, b) => a + b, 0);
  };

  return (
    <Col>
      <h1>Your Shopping Cart</h1>
      <Row>
        {loaded === false && (
          <img
            className="loading-image mt-5"
            src={loadingImage}
            alt="Loading spinner"
          />
        )}
      </Row>
      <div>
        {loaded === true &&
          cart.allItems.map((p) => (
            <li key={p.products.id}>
              {p.products.name}, {p.quantity}, ${p.products.cost / 100}, $
              {(p.products.cost / 100) * p.quantity}
            </li>
          ))}
        {loaded === true && `$${getTotalCost()}`}
      </div>
    </Col>
  );
};

export default Cart;
