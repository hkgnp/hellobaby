import React, { useState } from 'react';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ValidateUser from '../common/ValidateUser';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errors, setErrors] = useState({});
  const [role] = useState(2);

  const handleSubmit = async (e) => {
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
    console.log(errorMessages);

    if (errorMessages === 'Username has already been taken') {
      setErrors({
        usernameTaken: 'Username has already been taken',
      });
    } else {
      setErrors(errorMessages);
    }

    // const tokenResponse = await axios.post(
    //   `${config.BASE_URL}/api/users/login`,
    //   {
    //     email: email,
    //     password: password,
    //   }
    // );
    // localStorage.setItem('accessToken', tokenResponse.data.accessToken);
    // localStorage.setItem('refreshToken', tokenResponse.data.refreshToken);

    // // Redirect
    // window.location.href = '/allproducts';
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
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username ? (
            <div className="alert-sm alert-danger p-2">{errors.username}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email ? (
            <div className="alert-sm alert-danger p-2">{errors.email}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter a complex password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password ? (
            <div className="alert-sm alert-danger p-2">{errors.password}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirm-password"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword ? (
            <div className="alert-sm alert-danger p-2">
              {errors.confirmPassword}
            </div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="Delivery address please"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address ? (
            <div className="alert-sm alert-danger p-2">{errors.address}</div>
          ) : null}
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
            onChange={(e) => setPostalCode(e.target.value)}
          />
          {errors.postalCode ? (
            <div className="alert-sm alert-danger p-2">{errors.postalCode}</div>
          ) : null}
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
