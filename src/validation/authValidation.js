import joi from '@hapi/joi';
import passwordComplexity from 'joi-password-complexity';

// password complexity object
const complexityOptions = {
  min: 4,
  max: 250,
  lowerCase: 1,
  numeric: 1,
  requirementCount: 3,
};

const AuthValidation = {
  /**
   * validate user parameters during signup
   * @function
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof AuthValidation
   */
  validateSignup(payload) {
    const schema = {
      name: joi.string().min(3).max(30).label('Please enter a valid name \n the field must not be empty and it must be more than 2 letters'),
      email: joi.string().email().required().label('Please enter a valid email address'),
      password: joi.string().required()
        .label('Password is required or password is not valid'),
      role: joi.string().valid('admin', 'individual', 'group').label('User must be a admin/group/individual'),
      phoneNumber: joi.string().label('phone number must be valid')
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },

  /**
   * validate user parameters during login
   * @function
   * @param {object} payload - user object
   * @returns {boolean | object} - returns a boolean or an error object
   * @memberof AuthValidation
   */
  validateLogin(payload) {
    const schema = {
      email: joi.string().email().required()
        .label('incorrect password or email'),
      password: joi.string().required()
        .label('incorrect password or email')
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },
  /**
   * validate username credentials
   * @function
   * @param {object} payload - user object
   * @returns {boolean | object} - returns a boolean or an error object
   * @memberof AuthValidation
   */
  validateUsername(payload) {
    const schema = {
      userName: joi.string().min(3).max(15).regex(/^[a-zA-Z0-9_]{3,30}$/)
        .required()
        .label('Please input a valid userName \n It must only contain alphabets and/underscore ("-")'),
      change: joi.bool(),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default AuthValidation;
