import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { config } from './config';
import { UserContext } from './Context';
import { Container, Row } from 'reactstrap';
import NavigationBar from './components/views/NavigationBar';
import AllProducts from './components/views/AllProducts';
import About from './components/views/About';
import Cart from './components/views/Cart';
import Login from './components/views/Login';
import Register from './components/views/Register';
import ProductDetails from './components/views/ProductDetails';
import SearchResults from './components/views/SearchResults';
import FilterResults from './components/views/FilterResults';
import Checkout from './components/views/Checkout';
import CheckoutSuccess from './components/views/CheckoutSuccess';
import CheckoutError from './components/views/CheckoutError';
import Footer from './components/views/Footer';
import Profile from './components/views/Profile';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Set interval for refresh token
    setInterval(async () => {
      const response = await axios.post(
        config.BASE_URL + '/api/users/refresh',
        {
          refreshToken: localStorage.getItem('refreshToken'),
        }
      );
      localStorage.setItem('accessToken', response.data.accessToken);
    }, 1000 * 60 * 10);

    // Check if gotToken
    const gotToken = localStorage.getItem('accessToken');

    if (!gotToken) {
      setUser('No user');
    } else {
      (async () => {
        const userResponse = await axios.get(
          `${config.BASE_URL}/api/users/profile`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          }
        );
        setUser(userResponse.data.user);
      })();
    }
  }, []);

  const userContext = {
    user: () => {
      return user;
    },
  };

  return (
    <UserContext.Provider value={userContext}>
      <Router>
        <Container fluid={true}>
          <Row>
            <NavigationBar />
          </Row>
          <Row style={{ minHeight: '80vh' }}>
            <Switch>
              {/* Placeholder for setting different homepage for e.g. promos */}
              <Route exact path="/allproducts" component={AllProducts} />
              <Redirect exact path from="/" to="/allproducts" />
              <Route path="/product/:productId" component={ProductDetails} />
              <Route path="/searchresults" component={SearchResults} />
              <Route path="/filterresults" component={FilterResults} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/checkout/error" component={CheckoutError} />
              <Route
                exact
                path="/checkout/success"
                component={CheckoutSuccess}
              />
            </Switch>
          </Row>
          <Row>
            <Footer />
          </Row>
        </Container>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
