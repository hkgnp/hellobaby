import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

const Service = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">123123123</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            123123123
          </CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Service;
