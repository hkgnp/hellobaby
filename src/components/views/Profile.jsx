import React, { useState, useContext } from 'react';
import { Col } from 'reactstrap';
import { UserContext } from '../../Context';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Profile = () => {
  const userContext = useContext(UserContext);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');

  const [editProfile, setEditProfile] = useState(false);
  return (
    <Col>
      <Button
        onClick={() => {
          editProfile ? setEditProfile(false) : setEditProfile(true);
        }}
      >
        Edit Profile
      </Button>
      {!editProfile && (
        <React.Fragment>
          <h1>Your Profile</h1>
          <p> {userContext.user().username}</p>
          <p> {userContext.user().email}</p>
          <p> {userContext.user().address}</p>
          <p> {userContext.user().postal_code}</p>
        </React.Fragment>
      )}
      {editProfile && <h1>Edit Profile</h1>}
    </Col>
  );
};

export default Profile;
