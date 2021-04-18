import React, { useState } from 'react';
import { config } from '../../config';
import axios from 'axios';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const updateLoginForm = (e) => {
    let clone = { ...loginData };
    clone[e.target.name] = e.target.value;
    setLoginData(clone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get access and refresh tokens
      const tokenResponse = await axios.post(
        `${config.BASE_URL}/api/users/login`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      localStorage.setItem('accessToken', tokenResponse.data.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.data.refreshToken);

      // Redirect
      window.location.href = '/allproducts';
    } catch (e) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Col>
      <h1>User Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          {error ? (
            <div className="alert-sm alert-warning p-2 mb-3">{error}</div>
          ) : null}
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
        <button className="btn btn-success btn-sm mr-2">Submit</button>
        <a href="/allproducts" className="btn btn-danger btn-sm">
          Cancel
        </a>
      </Form>
    </Col>
  );
};

export default Login;
