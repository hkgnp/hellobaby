import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { config } from '../../config';
import { UserContext } from '../../Context';
import { Col } from 'reactstrap';

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
    })();
  }, [userContext]);

  return (
    <Col>
      <h1>Your Shopping Cart</h1>
      <div>
        {loaded === true &&
          cart.allItems.map((p) => (
            <li key={p.products.id}>{p.products.name}</li>
          ))}
      </div>
    </Col>
  );
};

export default Cart;
