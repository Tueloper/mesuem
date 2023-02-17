/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { GeneralService } from '../services';
import { Toolbox, Mailer } from '../util';
import database from '../models';

const {
  successResponse,
  errorResponse,
  createToken,
  hashPassword,
  comparePassword,
  verifyToken,
} = Toolbox;
const {
  addEntity,
  findByKey,
  // deleteByKey
} = GeneralService;
const {
  sendWelcomeEmail,
  sendNotificationEmail
} = Mailer;
const {
  User,
} = database;

const AuthController = {
  /**
   * user signup
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof AuthController
   */
  async signup(req, res) {
    try {
      // get the user information for signup
      const body = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        role: req.body.role,
        phoneNumber: req.body.phoneNumber
      };

      // add the user using sequelize add command
      const user = await addEntity(User, { ...body });
      // await sendWelcomeEmail(user);
      // send token
      // res.cookie('token', user.token, { maxAge: 70000000, httpOnly: true });
      return res.status(201).send(
        user
      );
    } catch (error) {
      console.error(error);
      errorResponse(res, {});
    }
  },

  /**
   * user login
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - a JSON response
   * @memberof AuthController
   */
  async login(req, res) {
    try {
      const { password } = req.body;
      const user = req.userData;
      // compare passwords, to be sure the password matches, if not send an error message
      if (!comparePassword(password, user.password)) return errorResponse(res, { code: 401, message: 'incorrect password or email' });

      // await sendWelcomeEmail(user);
      return res.status(200).send(
        user
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * get user profile
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - A jsom response with user details
   * @memberof UserController
   */
  async getProfile(req, res) {
    try {
      const { id } = req.tokenData;

      // retrieve user details by user id
      const user = await findByKey(User, { id });
      return res.status(200).send(
        user
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * logs user out
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - a JSON response
   * @memberof AuthController
   */
  async logoutUser(req, res) {
    try {
      const token = '';

      // send back empty user token, to log users out
      res.cookie('token', token, { maxAge: 0, httpOnly: true });
      return successResponse(res, { message: 'Logout Successful', token });
    } catch (error) {
      errorResponse(res, {});
    }
  },
};

export default AuthController;
