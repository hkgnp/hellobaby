import React, { useState } from 'react';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { config } from '../../config';
import axios from 'axios';
import ValidateUser from '../common/ValidateUser';

const Register = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [role] = useState(2);

  const handleForm = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const {
      username,
      email,
      password,
      confirmPassword,
      address,
      postalCode,
      role,
    } = userDetails;

    e.preventDefault();

    const errorMessages = await ValidateUser({
      username,
      email,
      password,
      confirmPassword,
      address,
      postalCode,
      role,
    });

    if (errorMessages === 'Email has already been taken') {
      setErrors({
        usernameTaken: 'Email has already been taken',
      });
    } else {
      setErrors(errorMessages);
    }

    const tokenResponse = await axios.post(
      `${config.BASE_URL}/api/users/login`,
      {
        email: email,
        password: password,
      }
    );
    localStorage.setItem('accessToken', tokenResponse.data.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.data.refreshToken);

    // Redirect
    window.location.href = '/allproducts';
  };

  return (
    <Col>
      <h1>Register</h1>
      <p>Register for an account to start buying!</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Your Name</Label>
          <Input
            type="text"
            name="username"
            placeholder="Your fine name"
            onChange={handleForm}
          />
          {errors.username && (
            <div className="alert-sm alert-warning p-2">{errors.username}</div>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            onChange={handleForm}
          />
          {errors.email && (
            <div className="alert-sm alert-warning p-2">{errors.email}</div>
          )}
          {errors.usernameTaken && (
            <div className="alert-sm alert-warning p-2">
              {errors.usernameTaken}
            </div>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter a complex password"
            onChange={handleForm}
          />
          {errors.password && (
            <div className="alert-sm alert-warning p-2">{errors.password}</div>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirm-password"
            placeholder="Confirm your password"
            onChange={handleForm}
          />
          {errors.confirmPassword && (
            <div className="alert-sm alert-warning p-2">
              {errors.confirmPassword}
            </div>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="Delivery address please"
            onChange={handleForm}
          />
          {errors.address && (
            <div className="alert-sm alert-warning p-2">{errors.address}</div>
          )}
          <FormText color="muted">
            Apologies, we currently only ship within Singapore.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label>Postal Code</Label>
          <Input
            type="text"
            name="postal_code"
            placeholder="SG postal code"
            onChange={handleForm}
          />
          {errors.postalCode && (
            <div className="alert-sm alert-warning p-2">
              {errors.postalCode}
            </div>
          )}
        </FormGroup>
        <button className="btn btn-success btn-sm mr-2">Submit</button>
        <a href="/allproducts" className="btn btn-danger btn-sm">
          Cancel
        </a>
      </Form>
    </Col>
  );
};

export default Register;
