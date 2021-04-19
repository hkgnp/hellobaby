import React, { useState, useContext, useEffect } from 'react';
import { Col } from 'reactstrap';
import { UserContext } from '../../Context';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Profile = () => {
  const userContext = useContext(UserContext);
  const [editProfile, setEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setUserDetails(userContext.user());
  }, [userContext]);

  const handleForm = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Col>
      <React.Fragment>
        <h1>{!editProfile ? 'Your Profile' : 'Edit Profile'}</h1>
        <Form>
          <FormGroup>
            <Label>Your Name</Label>
            <Input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleForm}
              disabled={!editProfile && true}
            />
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
          </FormGroup>
        </Form>
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
        <h3 className="mt-4">Past Orders</h3>
      </React.Fragment>
    </Col>
  );
};

export default Profile;
