import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { config } from '../../config';
import loadingImage from '../../rolling.svg';

const RenderPastOrders = (props) => {
  const userContext = useContext(UserContext);

  const [pastOrders, setPastOrders] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(userContext.user());
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/orders/${userContext.user().id}`
      );
      console.log(response.data.orders);
      setPastOrders(response.data.orders);
      setLoaded(true);
    })();
  }, [userContext]);

  return (
    <React.Fragment>
      {!loaded && (
        <img
          className="loading-image"
          src={loadingImage}
          alt="Loading spinner"
        />
      )}
      {loaded &&
        pastOrders.map((o) => (
          <Row
            key={o.id}
            className="bg-light mb-2 ml-0 p-2"
            style={{ borderRadius: '15px', width: '100%' }}
          >
            <Col className="d-flex flex-column">
              <h5>Order ID:</h5>
              <small className="order-id-small">{o.order_id}</small>a
            </Col>
            <Col className="d-flex justify-content-end align-items-center ">
              <h4>{o.status.name}</h4>
            </Col>
          </Row>
        ))}
    </React.Fragment>
  );
};

export default RenderPastOrders;
