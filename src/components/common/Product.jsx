import React from 'react';
import { Card, CardImg, CardText, CardBody, Badge } from 'reactstrap';

const Product = (props) => {
  return (
    <Card
      key={props.id}
      onClick={props.goToProduct}
      value={props.id}
      className="mb-2 d-flex"
    >
      <CardImg
        top
        height="70%"
        src={`${props.img_url}`}
        alt={props.name}
        className="card-image-details"
      />
      <CardBody className="mb-0" value={props.id}>
        <CardText className="mt-2 mb-0">{props.name}</CardText>
        <CardText className="m-0 p-0">
          {props.tags.map((t) => (
            <Badge
              style={{ backgroundColor: '#FF97B2' }}
              key={t.id}
              className="mr-1"
            >
              {t.tag_name}
            </Badge>
          ))}
        </CardText>
        <div className="d-flex justify-content-between">
          <CardText>
            <small className="text-muted"> {props.company}</small>
          </CardText>
          <CardText className="text-right" style={{ color: '#E1084F' }}>
            ${(props.cost / 100).toFixed(2)}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default Product;
