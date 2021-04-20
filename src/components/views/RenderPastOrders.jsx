import React from 'react';
import { Row, Col } from 'reactstrap';

const RenderPastOrders = (props) => {
  return (
    <React.Fragment>
      {console.log(props.pastOrders)}
      {props.pastOrders.map((o) => (
        <Row
          key={o.id}
          className="bg-light mb-2 ml-0 p-2"
          style={{ borderRadius: '15px', width: '100%' }}
        >
          <Col className="d-flex flex-column">
            <h5>Order ID:</h5>
            <small className="order-id-small">{o.order_id}</small>
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
