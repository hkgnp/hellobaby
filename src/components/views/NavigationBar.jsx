import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from 'reactstrap';

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar dark expand="lg">
        <NavbarBrand href="/" style={{ color: '#ffffff', fontWeight: 'bold' }}>
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
          <NavbarText>Placeholder for user information</NavbarText>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavigationBar;
