import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import NavigationBar from './components/views/NavigationBar';
import AllServices from './components/views/AllServices';
import About from './components/views/About';

const App = () => {
  return (
    <Container fluid={false}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/allservices" component={AllServices} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
