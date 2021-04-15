import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'reactstrap';
import NavigationBar from './components/views/NavigationBar';
import AllProducts from './components/views/AllProducts';
import About from './components/views/About';
import Login from './components/views/Login';
import ProductDetails from './components/views/ProductDetails';
import Footer from './components/views/Footer';
import axios from 'axios';
import { config } from './config';
import { UserContext } from './Context';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const gotToken = localStorage.getItem('accessToken');

    if (gotToken) {
      (async () => {
        const userResponse = await axios.get(
          config.BASE_URL + '/api/users/profile',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          }
        );
        setUser(userResponse.data);
      })();
    } else {
      return;
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
              <Route exact path="/allproducts" component={AllProducts} />
              <Route
                path="/product"
                render={(props) => <ProductDetails {...props} />}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
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
