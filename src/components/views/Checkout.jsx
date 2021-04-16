import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../Context';
import { config } from '../../config';
import { Col } from 'reactstrap';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const userContext = useContext(UserContext);

  //   const [publishableKey, setPublishableKey] = useState('');
  //   const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/checkout/${userContext.user().id}`
      );
      console.log(response.data);

      const stripe = await loadStripe(response.data.publishableKey);
      console.log(stripe);
      await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    })();
  }, [userContext]);

  return (
    <Col>
      <h1>Checkout</h1>
    </Col>
  );
};

export default Checkout;
