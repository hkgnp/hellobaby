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
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/cart/${userContext.user().id}`
      );
      setCart(response.data);
      console.log(response.data.allItems);
      setLoaded(true);
    })();
  }, [userContext]);

  const handleIncrement = async (e) => {
    // Get Index of item whose quantity is to change
    const productIndex = cart.allItems.findIndex(
      (p) => p.product_id === parseInt(e.target.name)
    );

    // Clone the existing state and mutate it
    let cloned = { ...cart };
    let { ...itemData } = cloned.allItems[productIndex];
    itemData.quantity += 1;
    cloned.allItems.splice(productIndex, 1, itemData);

    // Set back the state
    setCart({
      allItems: cloned.allItems,
    });

    // Update the database
    await axios.post(
      `${config.BASE_URL}/api/cart/update/${userContext.user().id}/${
        e.target.name
      }`,
      {
        quantity: parseInt(e.target.value) + 1,
      }
    );
  };

  const handleDecrement = async (e) => {
    if (parseInt(e.target.value) > 1) {
      await axios.post(
        `${config.BASE_URL}/api/cart/update/${userContext.user().id}/${
          e.target.name
        }`,
        {
          quantity: parseInt(e.target.value) - 1,
        }
      );
    } else {
      await axios.get(
        `${config.BASE_URL}/api/cart/remove/${userContext.user().id}/${
          e.target.name
        }`
      );
    }
  };

  const getTotalCost = () => {
    let totalCost = cart.allItems.map(
      (p) => (p.products.cost * p.quantity) / 100
    );
    return totalCost.reduce((a, b) => a + b, 0);
  };

  return (
    <Col>
      <h2>Shopping Cart</h2>
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
              <Col className="col-4 p-0 m-0 d-flex align-items-center">
                <img
                  className="cart-display-img"
                  alt={p.products.name}
                  src={p.products.thumbnail_url}
                />
              </Col>
              <Col className="cart-display">
                <h4 className="m-0">{p.products.name}</h4>
                <p className="m-0" style={{ color: '#E1084F' }}>
                  ${p.products.cost / 100}
                </p>
                <div
                  className="form-group col-4 p-0 d-flex m-0"
                  style={{ height: '20px' }}
                >
                  <button
                    onClick={handleDecrement}
                    className="btn btn-sm p-2 m-0"
                    name={p.product_id}
                    value={p.quantity}
                  >
                    -
                  </button>
                  <input
                    value={p.quantity}
                    type="text"
                    size="1"
                    className="form-control quantity-input"
                  />
                  <button
                    onClick={handleIncrement}
                    className="btn btn-sm p-2 m-0"
                    name={p.product_id}
                    value={p.quantity}
                  >
                    +
                  </button>
                </div>
              </Col>
            </Row>
          ))}
      </div>
      <Row className="d-flex justify-content-between align-items-center p-1">
        <h5 className="m-0 p-0">
          Total:{' '}
          <span style={{ color: '#E1084F' }}>
            ${loaded === true && getTotalCost()}
          </span>
        </h5>
        <button className="btn-sm">Checkout</button>
      </Row>
    </Col>
  );
};

export default Cart;
