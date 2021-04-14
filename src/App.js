import './App.css';
import React from 'react';
import { ApiUrlContext } from './Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import NavigationBar from './components/views/NavigationBar';
import AllProducts from './components/views/AllProducts';
import About from './components/views/About';
import Login from './components/views/Login';

const App = () => {
  //Context
  const apiUrlContext = {
    apiUrl: () => {
      return 'https://5e88f940fe8d.ngrok.io';
    },
  };

  return (
    <Container fluid={false}>
      <Router>
        <NavigationBar />

        <ApiUrlContext.Provider value={apiUrlContext}>
          <Switch>
            <Route exact path="/allproducts" component={AllProducts} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </ApiUrlContext.Provider>
      </Router>
    </Container>
  );
};

export default App;
