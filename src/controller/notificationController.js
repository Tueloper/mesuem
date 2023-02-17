/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { GeneralService, NotificationService } from '../services';
import { Toolbox } from '../util';
import database from '../models';
// import { env } from '../config';

const {
  successResponse,
  errorResponse
} = Toolbox;
const {
  addEntity,
} = GeneralService;
const {
  getNotifications
} = NotificationService;
const {
  Notification,
} = database;

const NotificationController = {

  /**
   * add notifications
   * @param {object} req
   * @param {object} res
   * @returns {JSON } A JSON response with the user's profile details.
   * @memberof NotificationController
   */
  async addNotification(req, res) {
    try {
      const { id, type } = req.tokenData;
      const notification = await addEntity(Notification, {
        type,
        userId: id,
        subjectId: req.body.subject,
        read: false,
        message: req.body.message
      });
      return successResponse(res, { notification });
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * get notifications
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ManagerController
   */
  async getNotifications(req, res) {
    try {
      const { id } = req.tokenData;
      const notifications = await getNotifications({ userId: id });
      const notificationCount = notifications.filter(({ read }) => read === false).length;
      if (!notifications.length) return successResponse(res, { message: 'No notifications found', notifications: [], notificationCount });
      return successResponse(res, { message: 'Notifications gotten successfully', notifications, notificationCount });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },
};

export default NotificationController;
