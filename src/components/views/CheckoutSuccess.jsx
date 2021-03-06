import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { config } from '../../config';
import { UserContext } from '../../Context';
import { Row, Col } from 'reactstrap';

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
            Authorization: 'Bearer ' + process.env.REACT_APP_STRIPE_SECRET_KEY,
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

  const printPage = () => {
    window.print();
  };

  return (
    <Col>
      <h1>Order Confirmed</h1>
      <p>Thank you very much from all of us at HelloBaby!</p>
      {purchasedItems.map((i) => (
        <Row
          className="bg-light mb-2 ml-0 p-2"
          style={{ borderRadius: '15px', width: '100%' }}
        >
          <Col className="d-flex flex-column">
            <h4>{i.description}</h4>
            <p>Quantity: {i.quantity}</p>
          </Col>
          <Col className="d-flex justify-content-center align-items-center ">
            <h4>${i.amount_subtotal / 100}</h4>
          </Col>
        </Row>
      ))}
      <h1>
        <span onClick={printPage} className="badge badge-success mr-2">
          ${getTotalCost()}&nbsp;&nbsp;<i className="fas fa-print"></i>
        </span>
      </h1>
    </Col>
  );
};

export default CheckoutSuccess;
