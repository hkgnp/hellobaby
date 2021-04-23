import React from 'react';
import { Col } from 'reactstrap';

const CheckoutError = () => {
  return (
    <Col>
      <h1>We're Sorry ...</h1>
      <p>
        Apologies, there was an error in payment. No costs were deducted from
        your account.
      </p>
      <p>
        Please navigate to your&nbsp;
        <a href="/cart">
          <i className="fas fa-shopping-cart"></i> shopping cart
        </a>{' '}
        and try again.
      </p>
    </Col>
  );
};

export default CheckoutError;
