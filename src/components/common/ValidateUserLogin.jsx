import axios from 'axios';
import Joi from 'joi';
import { config } from '../../config';

const ValidateUserLogin = async (props) => {
  // Destructure
  const { username, email, address, postal_code } = props;

  // Set up schema for Joi
  const schema = Joi.object({
    username: Joi.string().required().label('Name'),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label('Username'),
    address: Joi.string().required().label('Address'),
    postal_code: Joi.string().min(6).max(6).required().label('Postal Code'),
  });

  // Implement Joi validation
  const validationResult = schema.validate(
    { username, email, address, postal_code },
    {
      abortEarly: false,
    }
  );

  console.log(validationResult);

  if (validationResult.error === undefined) {
    try {
      await axios.post(`${config.BASE_URL}/api/users/register`, {
        username: username,
        email: email,
        address: address,
        postal_code: postal_code,
      });
      return 'User successfully updated';
    } catch (e) {
      return 'Error updating user';
    }
  } else {
    const errors = {};
    validationResult.error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  }
};

export default ValidateUserLogin;
