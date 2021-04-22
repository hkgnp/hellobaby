import React, { useState, useContext, useEffect } from 'react';
import { Col, FormText } from 'reactstrap';
import { UserContext } from '../../Context';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import ValidateUserUpdateProfile from '../common/ValidateUserUpdateProfile';
import RenderPastOrders from './RenderPastOrders';

const Profile = () => {
  const userContext = useContext(UserContext);
  const [editProfile, setEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    userContext.user() === 'No user'
      ? setErrors({
          notLoggedIn: 'You must be logged in to view this page.',
        })
      : setUserDetails(userContext.user());
  }, [userContext]);

  const handleForm = (e) => {
    let clone = { ...userDetails };
    setUserDetails({
      ...clone,
      [e.target.name]: e.target.value,
      role: 2,
    });
  };

  const handleSubmit = async (e) => {
    const { username, email, address, postal_code, contact } = userDetails;

    e.preventDefault();

    const errorMessages = await ValidateUserUpdateProfile({
      username,
      email,
      address,
      postal_code,
      contact,
    });

    if (errorMessages === 'Error updating user') {
      setErrors({
        updateError: 'Error updating your profile. Please try again.',
      });
    } else if (errorMessages === 'User successfully updated') {
      setEditProfile(false);
    } else {
      setErrors(errorMessages);
    }
  };

  return (
    <Col>
      {errors.notLoggedIn ? (
        <p>
          {errors.notLoggedIn}. <a href="/login">Login</a> or{' '}
          <a href="/register">Register</a> for a new account.
        </p>
      ) : (
        <React.Fragment>
          <h1>{!editProfile ? 'Your Profile' : 'Edit Profile'}</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Your Email</Label>
              <Input
                type="text"
                name="email"
                value={userDetails.email || ''}
                onChange={handleForm}
                disabled
              />
              {editProfile && (
                <FormText>
                  Apologies, your email cannot be changed from here. Please
                  contact us if you would like to do so.
                </FormText>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Your Name</Label>
              <Input
                type="text"
                name="username"
                value={userDetails.username || ''}
                onChange={handleForm}
                disabled={!editProfile && true}
              />
              {errors.username && (
                <div className="alert-sm alert-warning p-2">
                  {errors.username}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Your Contact</Label>
              <Input
                type="text"
                name="contact"
                value={userDetails.contact || ''}
                onChange={handleForm}
                disabled={!editProfile && true}
              />
              {errors.contact && (
                <div className="alert-sm alert-warning p-2">
                  {errors.contact}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Your Address</Label>
              <Input
                type="text"
                name="address"
                value={userDetails.address || ''}
                onChange={handleForm}
                disabled={!editProfile && true}
              />
              {errors.address && (
                <div className="alert-sm alert-warning p-2">
                  {errors.address}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Your Postal Code</Label>
              <Input
                type="text"
                name="postal_code"
                value={userDetails.postal_code || ''}
                onChange={handleForm}
                disabled={!editProfile && true}
              />
              {errors.postal_code && (
                <div className="alert-sm alert-warning p-2">
                  {errors.postal_code}
                </div>
              )}
            </FormGroup>
            {!editProfile ? (
              <button
                className="btn btn-warning"
                onClick={() => {
                  editProfile ? setEditProfile(false) : setEditProfile(true);
                }}
              >
                Edit Profile
              </button>
            ) : (
              <React.Fragment>
                <button className="btn btn-warning mr-2">Update Profile</button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    editProfile ? setEditProfile(false) : setEditProfile(true);
                  }}
                >
                  Cancel
                </button>
              </React.Fragment>
            )}
          </Form>
          <h3 className="mt-4">Past Orders</h3>
          <RenderPastOrders />
        </React.Fragment>
      )}
    </Col>
  );
};

export default Profile;
