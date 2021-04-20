import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../Context';
import { config } from '../../config';
import { Col } from 'reactstrap';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/checkout/${userContext.user().id}`
      );

      const stripe = await loadStripe(response.data.publishableKey);
      await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    })();
  }, [userContext]);

  return (
    <Col>
      <h3>Please wait while we transfer you to Stripe...</h3>
    </Col>
  );
};

export default Checkout;
