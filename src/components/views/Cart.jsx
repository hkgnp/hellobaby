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
      console.log(response.data.allItems);
      await setLoaded(true);
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
            <Row key={p.products.id}>
              <Col className="border col-4 p-0 m-0 d-flex align-items-center">
                <img
                  className="cart-display-img"
                  alt={p.products.name}
                  src={p.products.thumbnail_url}
                />
              </Col>
              <Col className="border cart-display">
                <h4 className="m-0">{p.products.name}</h4>
                <p className="m-0" style={{ color: '#E1084F' }}>
                  ${p.products.cost / 100}
                </p>
                <div
                  className="form-group col-4 p-0 d-flex m-0"
                  style={{ height: '20px' }}
                >
                  <button className="btn btn-sm p-2 m-0">-</button>
                  <input
                    value={p.quantity}
                    type="text"
                    size="1"
                    className="form-control p-1"
                  />
                  <button className="btn btn-sm p-2 m-0">+</button>
                </div>
              </Col>
            </Row>
          ))}
      </div>
      <Row className="border d-flex justify-content-between align-items-center p-1">
        <h5 className="m-0 p-0">
          Total: <span style={{ color: '#E1084F' }}>${getTotalCost()}</span>
        </h5>
        <button className="btn btn-primary btn-sm">Checkout</button>
      </Row>
    </Col>
  );
};

export default Cart;
