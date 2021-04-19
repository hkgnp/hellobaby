import React, { useState, useContext, useEffect } from 'react';
import { Col } from 'reactstrap';
import { UserContext } from '../../Context';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import ValidateUserLogin from '../common/ValidateUserLogin';

const Profile = () => {
  const userContext = useContext(UserContext);
  const [editProfile, setEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    userContext.user() === 'No user'
      ? setErrors({ notLoggedIn: 'You must be logged in to view this page' })
      : setUserDetails(userContext.user());
  }, [userContext]);

  const handleForm = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const { username, email, address, postal_code } = userDetails;

    const errorMessages = await ValidateUserLogin({
      username,
      email,
      address,
      postal_code,
    });

    if (errorMessages === 'Error updating user') {
      setErrors({
        updateError: 'Error updating your profile. Please try again.',
      });
    } else {
      setErrors(errorMessages);
    }
  };

  return (
    <Col>
      {errors.notLoggedIn ? (
        errors.notLoggedIn
      ) : (
        <React.Fragment>
          <h1>{!editProfile ? 'Your Profile' : 'Edit Profile'}</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Your Name</Label>
              <Input
                type="text"
                name="username"
                value={userDetails.username}
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
              <Label>Your Email</Label>
              <Input
                type="text"
                name="email"
                value={userDetails.email}
                onChange={handleForm}
                disabled={!editProfile && true}
              />
              {errors.email && (
                <div className="alert-sm alert-warning p-2">{errors.email}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Your Address</Label>
              <Input
                type="text"
                name="address"
                value={userDetails.address}
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
                value={userDetails.postal_code}
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
        </React.Fragment>
      )}
    </Col>
  );
};

export default Profile;
