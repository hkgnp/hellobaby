import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { config } from '../../config';
import { UserContext } from '../../Context';
import { Col } from 'reactstrap';

const CheckoutSuccess = () => {
  const userContext = useContext(UserContext);
  const sessionId = window.location.href.substring(
    window.location.href.lastIndexOf('=%20') + 4
  );

  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    (async () => {
      // Route to clear shopping cart
      const checkoutResponse = await axios.get(
        `${config.BASE_URL}/api/checkout/success/${userContext.user().id}`
      );
      console.log(checkoutResponse.data);

      // Route to get line items from Stripe checkout session
      const stripeResponse = await axios.get(
        `https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items`,
        {
          headers: {
            Authorization:
              'Bearer ' +
              'sk_test_51IaGU3L2CSs7osvhVdiPNeh3D3oVJrbqwUiqSe3n0uojPpADzO709W3KAerXNX5A7GIlPfOBtfqjCoIWFiE2rwLB00dp6wOUNv',
          },
        }
      );
      setPurchasedItems(stripeResponse.data.data);
    })();
  }, [sessionId, userContext]);

  const getTotalCost = () => {
    let totalCost = purchasedItems.map((i) => i.amount_subtotal / 100);
    return totalCost.reduce((a, b) => a + b, 0);
  };

  return (
    <Col>
      <h1>Order Confirmed</h1>
      {purchasedItems.map((i) => (
        <li>
          {i.description}, ${i.amount_subtotal / 100}, {i.quantity}
        </li>
      ))}
      <span>${getTotalCost()}</span>
    </Col>
  );
};

export default CheckoutSuccess;
