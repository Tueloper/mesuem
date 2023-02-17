/* eslint-disable no-useless-escape */
import joi from '@hapi/joi';

// const { states, countries } = validationData;

const GeneralValidation = {
  /**
   * validate general parameters
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateParameters(payload) {
    const schema = {
      description: joi.string().label('Please input a valid privacy description'),
      id: joi.number().positive().label('Please enter a positive number for id parameter'),
      email: joi.string().email().label('Please enter a valid email address'),
      title: joi.string().label('Please input a valid post title'),
      body: joi.string().label('Please input a valid post message'),
      subject: joi.string().min(1).max(50).label('Please enter a valid subject'),
      message: joi.string().min(1).max(500).label('Please enter a valid message \n the field must not be empty and it must be more than 10 letters'),
      avialableDate: joi.date().label('Please input a valid date when the You will be available'),
      startTime: joi.string().label('Please enter a valid start time'),
      endTime: joi.string().label('Please enter a valid end time'),
      booked: joi.bool().label('Please indicated whether you want to book or not'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },

  /**
   * validate required email
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateEmail(payload) {
    const schema = {
      email: joi.string().email().required()
        .label('Please enter a valid email address'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },

  /**
   * validate schedule payload
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateAddon(payload) {
    const schema = {
      name: joi.string().min(1).max(50).label('Please enter a valid name'),
      description: joi.string().min(1).max(10050).label('Please enter a valid description'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },

  /**
   * validate required id
   * @param {object} payload - user object
   * @returns {object | boolean} - returns a boolean or an error object
   * @memberof GeneralValidation
   */
  validateId(payload) {
    const schema = {
      id: joi.number().positive().required()
        .label('Please enter a positive number for id parameter'),
    };
    const { error } = joi.validate({ ...payload }, schema);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default GeneralValidation;
