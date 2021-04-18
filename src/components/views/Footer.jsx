import React from 'react';
import { Col } from 'reactstrap';

const Footer = () => {
  return (
    <Col className="footer">
      <Col className="footer-text">
        HelloBaby 2021
        <br />
        Inc in Singapore
        <br />5 Jalan Longkang
        <br />
        Singapore 100100
      </Col>
      <Col className="footer-text">Column 2</Col>
    </Col>
  );
};

export default Footer;
