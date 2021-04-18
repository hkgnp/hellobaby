import axios from 'axios';
import Joi from 'joi';
import { config } from '../../config';

const ValidateUser = async (props) => {
  // Destructure
  const {
    username,
    email,
    password,
    confirmPassword,
    address,
    postalCode,
    role,
  } = props;

  // Set up schema for Joi
  const schema = Joi.object({
    username: Joi.string().required().label('Name'),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label('Username'),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z]).{5,}$'))
      .label('Password')
      .messages({
        'string.pattern.base':
          'Password must be at least 5 characters with at least 1 number, 1 lowercase and 1 uppercase character',
      }),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Passwords')
      .messages({ 'any.only': 'Passwords do not match' }),
    address: Joi.string().required().label('Address'),
    postalCode: Joi.string().min(6).max(6).required().label('Postal Code'),
  });

  // Implement Joi validation
  const validationResult = schema.validate(
    { username, email, password, confirmPassword, address, postalCode },
    {
      abortEarly: false,
    }
  );

  if (validationResult.error !== null) {
    const errors = {};
    validationResult.error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  } else {
    try {
      await axios.post(`${config.BASE_URL}/api/users/register`, {
        username: username,
        email: email,
        password: password,
        address: address,
        postal_code: postalCode,
        role_id: role,
      });
      return 'User successfully registered';
    } catch (e) {
      return 'Username has already been taken';
    }
  }
};

export default ValidateUser;
