import { Op } from 'sequelize';
import database from '../models';

const {
  // User,
  Schedule,
  TeacherSchedule,
  Booking,
} = database;

const ScheduleService = {
  /**
   * Get user available dates
   * @async
   * @param {object} key - inputs like names or tags
   * @returns {promise-Object} - A promise object with entity details
   * @memberof ScheduleService
   */
  async getAvailableDates(key) {
    try {
      const entities = await Schedule.findAll({
        where: key.startDate ? {
          avialableDate: {
            [Op.between]: [key.startDate, key.endDate]
          }
        } : key,
        order: [
          ['id', 'DESC']
        ],
        returning: true
      });
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * Get user available dates
   * @async
   * @param {object} key - inputs like names or tags
   * @returns {promise-Object} - A promise object with entity details
   * @memberof ScheduleService
   */
  async getTeacherSchedules(key) {
    try {
      const entities = await TeacherSchedule.findAll({
        where: key.startDate ? {
          avialableDate: {
            [Op.between]: [key.startDate, key.endDate]
          }
        } : key,
        order: [
          ['avialableDate', 'DESC']
        ],
        returning: true
      });
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * Get user available dates
   * @async
   * @param {object} key - inputs like names or tags
   * @returns {promise-Object} - A promise object with entity details
   * @memberof ScheduleService
   */
  async getStduentsBookings(key) {
    try {
      const entities = await Booking.findAll({
        where: key.startDate ? {
          avialableDate: {
            [Op.between]: [key.startDate, key.endDate]
          }
        } : key,
        order: [
          ['avialableDate', 'DESC']
        ],
        returning: true
      });
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * Get bookings
   * @async
   * @param {object} key - inputs like names or tags
   * @returns {promise-Object} - A promise object with entity details
   * @memberof ScheduleService
   */
  async getBookings(key) {
    try {
      const entities = await TeacherSchedule.findAll({
        include: [
          {
            model: Booking,
            as: 'bookings',
          }
        ],
        // eslint-disable-next-line no-nested-ternary
        where: key,
        order: [
          ['id', 'DESC']
        ],
        returning: true
      });
      return entities;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default ScheduleService;
