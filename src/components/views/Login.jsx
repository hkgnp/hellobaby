import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const updateLoginForm = (e) => {
    let clone = { ...loginData };
    clone[e.target.name] = e.target.value;
    setLoginData(clone);
  };

  const handleSubmit = () => {
    // Set api endpoint for user login
  };

  return (
    <React.Fragment>
      <h1>User Login</h1>
      <form method="POST">
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
      </form>
    </React.Fragment>
  );
};

export default Login;
