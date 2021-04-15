import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import NavigationBar from './components/views/NavigationBar';
import AllProducts from './components/views/AllProducts';
import About from './components/views/About';
import Login from './components/views/Login';
import ProductDetails from './components/views/ProductDetails';

const App = () => {
  return (
    <Container fluid={true}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/allproducts" component={AllProducts} />
          <Route
            path="/product"
            render={(props) => <ProductDetails {...props} />}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
