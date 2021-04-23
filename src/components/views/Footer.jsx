import React from 'react';
import { Col } from 'reactstrap';

const Footer = () => {
  return (
    <Col className="footer">
      <Col className="footer-text">
        HelloBaby &copy; 2021
        <br />
        Inc in Singapore
        <br />
        35 Orchard Road
        <br />
        Singapore 238823
      </Col>
      <Col className="footer-logo">
        {/* Follow Us:
        <br /> */}
        <i class="fab fa-twitter"></i>&nbsp;&nbsp;&nbsp;
        <i class="fab fa-facebook"></i>
        &nbsp;&nbsp;&nbsp;<i class="fab fa-instagram"></i>&nbsp;&nbsp;&nbsp;
        <i class="fab fa-pinterest-p"></i>&nbsp;&nbsp;&nbsp;
        <i class="fab fa-tiktok"></i>&nbsp;&nbsp;&nbsp;
        <i class="fab fa-youtube"></i>
      </Col>
    </Col>
  );
};

export default Footer;
