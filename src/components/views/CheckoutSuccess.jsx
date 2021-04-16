import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { config } from '../../config';
import { UserContext } from '../../Context';
import { Col } from 'reactstrap';

const CheckoutSuccess = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/checkout/success/${userContext.user().id}`
      );
      console.log(response.data);
    })();
  });
  return (
    <Col>
      <h1>Thank you for your purchase!</h1>
    </Col>
  );
};

export default CheckoutSuccess;
