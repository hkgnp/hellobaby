import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ApiUrlContext } from '../../Context';
import axios from 'axios';
import { Button, FormGroup, Label, Input } from 'reactstrap';

const Login = (props) => {
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
    const response = await axios.post(context.apiUrl() + '/api/users/login', {
      email: loginData.email,
      password: loginData.password,
    });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    props.history.push('/allproducts');
  };

  return (
    <React.Fragment>
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
      <Button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Log In
      </Button>
    </React.Fragment>
  );
};

export default withRouter(Login);
