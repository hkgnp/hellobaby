import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { config } from '../../config';
import axios from 'axios';
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const updateLoginForm = (e) => {
    let clone = { ...loginData };
    clone[e.target.name] = e.target.value;
    setLoginData(clone);
  };

  const handleSubmit = async () => {
    // Get access and refresh tokens
    const tokenResponse = await axios.post(
      config.BASE_URL + '/api/users/login',
      {
        email: loginData.email,
        password: loginData.password,
      }
    );
    localStorage.setItem('accessToken', tokenResponse.data.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.data.refreshToken);

    // Redirect
    window.location.href = '/allproducts';
  };

  return (
    <Col>
      <h1>User Login</h1>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={updateLoginForm}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={updateLoginForm}
        />
      </FormGroup>
      <Button className="btn-sm" type="submit" onClick={handleSubmit}>
        Log In
      </Button>
    </Col>
  );
};

export default withRouter(Login);
