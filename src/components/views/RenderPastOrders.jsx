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
    (async () => {
      const response = await axios.get(
        `${config.BASE_URL}/api/orders/${userContext.user().id}`
      );

      let orders = response.data.orders;

      const getProductNameFromId = (id, arr) => {
        return arr.filter((p) => p.id === id)[0].name;
      };

      const getProductCostFromId = (id, arr) => {
        return arr.filter((p) => p.id === id)[0].cost;
      };

      const getProductImageFromId = (id, arr) => {
        return arr.filter((p) => p.id === id)[0].thumbnail_url;
      };

      for (let o of orders) {
        for (let p of o.orderitems) {
          p['name'] = getProductNameFromId(p.product_id, o.products);
          p['cost'] = getProductCostFromId(p.product_id, o.products);
          p['thumbnail_url'] = getProductImageFromId(p.product_id, o.products);
        }
      }

      setPastOrders(orders);
      setLoaded(true);
    })();
  }, [userContext]);

  const getGrandTotal = (arr) => {
    const reducer = (acc, curr) => acc + curr;
    return arr.reduce(reducer).toFixed(2);
  };

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
              <small className="order-id-small">{o.order_id}</small>
              {o.orderitems.map((o) => (
                <div key={o.id} className="d-flex flex-row mt-2">
                  <img
                    src={o.thumbnail_url}
                    alt={o.name}
                    className="mr-3"
                    style={{
                      height: '100px',
                      width: '100px',
                      objectFit: 'contain',
                      borderRadius: '12px',
                    }}
                  />
                  <div className="d-flex flex-column mt-3">
                    <strong>{o.name}</strong> x {o.quantity}
                    <br />
                    Item Total: ${((o.quantity * o.cost) / 100).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-center py-3">
                <h4 className="m-0 p-0">
                  $
                  {getGrandTotal(
                    o.orderitems.map((p) => (p.quantity * p.cost) / 100)
                  )}
                </h4>
                <h4 className="m-0 p-0">{o.status.name}</h4>
              </div>
            </Col>
          </Row>
        ))}
    </React.Fragment>
  );
};

export default RenderPastOrders;
