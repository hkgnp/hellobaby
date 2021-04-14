import React, { useState, useContext } from 'react';
import { ApiUrlContext } from '../../Context';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {
  const context = useContext(ApiUrlContext);
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
    // Set api endpoint for user login
    console.log(context.apiUrl);
  };

  return (
    <React.Fragment>
      <h1>User Login</h1>
      <Form method="POST">
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
        <Button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Login;
