import { AuthValidation } from '../validation';
import { Toolbox } from '../util';
import { GeneralService } from '../services';
import database from '../models';

const {
  errorResponse, checkToken, verifyToken,
} = Toolbox;
const {
  validateSignup, validateLogin
} = AuthValidation;
const {
  findByKey
} = GeneralService;
const {
  User
} = database;
const AuthMiddleware = {
  /**
   * middleware for user signup
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof AuthMiddleware
   */
  async verifySignup(req, res, next) {
    try {
      const { email } = req.body;

      // validate the sign up req body
      validateSignup(req.body);

      // check if the user already exist in the system
      const user = await findByKey(User, { email });

      // send an error message if the user already exist
      if (user) return errorResponse(res, { code: 409, message: 'Sorry, this email address is in use by another user, kindly review email address' });

      // move on
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware for user login
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returened by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof AuthMiddleware
   */
  async verifyLogin(req, res, next) {
    try {
      // validate user login details
      validateLogin(req.body);

      const { email, phoneNumber } = req.body;

      // check if the user actually exist
      let user;

      if (email) {
        user = await findByKey(User, { email });
      } else if (phoneNumber) {
        user = await findByKey(User, { phoneNumber });
      } else {
        return errorResponse(res, { code: 404, message: 'user does not match anything in our database' });
      }

      // if the user does not exist send an error message
      if (!user) return errorResponse(res, { code: 404, message: 'email does not match anything in our database' });
      req.userData = user;
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * user authentication
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} - returns error or response object
   * @memberof AuthMiddleware
   */
  async authenticate(req, res, next) {
    try {
      // retrieve token from the request headers
      // const token = checkToken(req);
      const { email, phoneNumber } = req.query;

      // if token does not exist, send error message
      if (!email && !phoneNumber) return errorResponse(res, { code: 401, message: 'Access denied, Token required' });

      let user;

      if (email) {
        user = await findByKey(User, { email });
      } else if (phoneNumber) {
        user = await findByKey(User, { phoneNumber });
      } else {
        return errorResponse(res, { code: 404, message: 'user does not match anything in our database' });
      }

      // if the user does not exist send an error message
      if (!user) return errorResponse(res, { code: 404, message: 'User does not exist' });

      req.tokenData = user;
      next();
    } catch (error) {
      if (error.message === 'Invalid Token') {
        return errorResponse(res, { code: 400, message: 'The token provided was invalid' });
      }
    }
  },

  /**
   * verify user role
   * @param {array} permissions - array with role id's permitted on route
   * @returns {function} - returns an async functon
   * @memberof AuthMiddleware
   */
  verifyRoles(permissions) {
    return async function bar(req, res, next) {
      try {
        // get id from authenticated token data
        const { role } = req.tokenData;

        // find user by id
        // const user = await findByKey(User, { id });

        // if user user doesnt exist send back an error message
        // if (!user) return errorResponse(res, { code: 404, message: 'user in token does not exist' });

        // check also if user has the right access to access the api in requiest
        const permitted = permissions.includes(role);

        // if not permitted, send user an error message
        if (!permitted) return errorResponse(res, { code: 403, message: 'Halt! You\'re not authorised' });
        next();
      } catch (error) {
        errorResponse(res, {});
      }
    };
  },
};

export default AuthMiddleware;
