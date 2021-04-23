import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem,
  NavbarBrand,
  Nav,
  NavLink,
  NavbarText,
} from 'reactstrap';
import { UserContext } from '../../Context';
import { config } from '../../config';
import axios from 'axios';
import logo from '../../withname.png';

const NavigationBar = (props) => {
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

  const handleSearch = async (e) => {
    e.preventDefault();
    props.history.push({
      pathname: '/filterresults',
      search: `?filter=${e.target.name}`,
    });
  };

  return (
    <Col className="navdiv">
      <Navbar dark expand="lg">
        <NavbarBrand href="/" style={{ fontWeight: 'bold' }}>
          <img src={logo} alt="Hello Baby Logo" style={{ height: '40px' }} />
          &nbsp; Hello Baby
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* Placeholder for NavItem */}
            <NavItem>
              <NavLink name="2" onClick={handleSearch}>
                Travel
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink name="1" onClick={handleSearch}>
                Herbs
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            {gotToken() || (
              <React.Fragment>
                <a
                  href="/login"
                  className="btn-outline-light btn btn-sm my-0 mr-2"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="btn btn-sm my-0"
                  style={{ backgroundColor: '#9C6995' }}
                >
                  <span className="text-light">Register</span>
                </a>
              </React.Fragment>
            )}
            {gotToken() && (
              <React.Fragment>
                <a className="mr-2" href="/cart">
                  <i className="fas fa-shopping-cart"></i>
                </a>
                <a
                  href="/profile"
                  className="btn btn-sm my-0 mr-1"
                  style={{ backgroundColor: '#9C6995' }}
                >
                  <span className="text-dlightark">
                    {userContext.user().username}
                  </span>
                </a>
                <button
                  className="btn-outline-light btn btn-sm my-0"
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
