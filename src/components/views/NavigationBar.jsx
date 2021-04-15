import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import { UserContext } from '../../Context';
import { config } from '../../config';
import axios from 'axios';

const NavigationBar = () => {
  const userContext = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogOut = async () => {
    await axios.post(config.BASE_URL + '/api/users/logout', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/allproducts';
  };

  const gotToken = () => {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Col className="navdiv">
      <Navbar dark expand="lg">
        <NavbarBrand href="/" style={{ fontWeight: 'bold' }}>
          <i className="fas fa-baby"></i>
          &nbsp;HelloBaby
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/allproducts">
                <i className="fas fa-list-alt" style={{ color: 'blue' }}></i>
                &nbsp;Browse Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/usefullinks">
                <i className="fas fa-gift" style={{ color: 'green' }}></i>
                &nbsp;Useful Links
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">
                <i className="fas fa-info-circle" style={{ color: 'red' }}></i>
                &nbsp;About This App
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            {gotToken() || (
              <a href="/login" className="btn btn-outline-dark btn-sm my-0">
                <span className="text-dark">Login</span>
              </a>
            )}
            {gotToken() && (
              <React.Fragment>
                <a className="mr-2" href="/cart">
                  <i className="fas fa-shopping-cart"></i>
                </a>
                <button className="btn-outline-dark btn-sm my-0">
                  {userContext.user().username}
                </button>
                <button
                  className="btn-outline-dark btn-sm my-0"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </React.Fragment>
            )}
          </NavbarText>
        </Collapse>
      </Navbar>
    </Col>
  );
};

export default NavigationBar;
