import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import NavigationBar from './components/views/NavigationBar';
import AllProducts from './components/views/AllProducts';
import About from './components/views/About';
import Login from './components/views/Login';

const App = () => {
  return (
    <Container fluid={false}>
      <Router>
        <Row>
          <Col>
            <NavigationBar />
          </Col>
        </Row>
        <Switch>
          <Row>
            <Col>
              <Route exact path="/allproducts" component={AllProducts} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
            </Col>
          </Row>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
