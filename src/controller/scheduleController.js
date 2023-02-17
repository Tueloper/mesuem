/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { GeneralService, ScheduleService } from '../services';
import { Toolbox, Mailer } from '../util';
import database from '../models';

const {
  successResponse,
  errorResponse,
  // generateTicketCode
} = Toolbox;
const {
  getAvailableDates,
  getBookings,
  getTeacherSchedules,
  getStduentsBookings
} = ScheduleService;
const {
  addEntity,
  updateByKey,
  deleteByKey,
  findMultipleByKey,
  findByKey
} = GeneralService;
const {
  sendAppointMail,
  sendNotificationEmail
} = Mailer;
const {
  User,
  Schedule,
  TeacherSchedule,
  StudentBooking,
  Booking
} = database;

const ScheduleController = {
  /**
   * Select available time and date
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async setAvialableTimePerDay(req, res) {
    try {
      const { id } = req.tokenData;
      const { body } = req;
      const availableTime = await addEntity(Schedule, { ...body, lectuererId: id });
      return successResponse(res, { message: 'Available time set Successfully', availableTime });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * Select available time and date
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async addScheduleV2(req, res) {
    try {
      const { id } = req.tokenData;
      const { body } = req;
      const { avialableDate } = body;
      const year = new Date(avialableDate).getFullYear();
      const month = new Date(avialableDate).getMonth();
      const day = new Date(avialableDate).getDay();

      const schedule = await addEntity(TeacherSchedule, {
        ...body, lectuererId: id, booked: true, year, month, day
      });
      await sendAppointMail(req.tokenData, schedule);
      return res.status(201).send(
        schedule
      );
    } catch (error) {
      console.error(error);
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * Select available time and date
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async addBookingV2(req, res) {
    try {
      const { id } = req.tokenData;
      const { body } = req;
      const {
        year, month, day, avialableDate
      } = req.teacherSchedule;
      const booking = await addEntity(Booking, {
        ...body, studentId: id, year, month, day, avialableDate
      });
      const lectuerer = await findByKey(User, { id: req.teacherSchedule.lectuererId });
      await sendNotificationEmail(req.tokenData, lectuerer, booking);
      return res.status(201).send(
        booking
      );
    } catch (error) {
      console.error(error);
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * get all available time per day
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async getTeacherSchedule(req, res) {
    try {
      const {
        startDate, endDate, booked, id
      } = req.query;
      let schedules;

      if (id) {
        schedules = await getTeacherSchedules({ id });
      } else if (startDate && endDate) {
        schedules = await getTeacherSchedules({ startDate, endDate });
      } else if (booked) {
        schedules = await getTeacherSchedules({ booked });
      }
      return res.status(200).send(
        schedules
      );
      // return successResponse(res, { message: 'Schedules Gotten Successfully', availableDates });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * get all available time per day
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async getAvailableDate(req, res) {
    try {
      const {
        startDate, endDate, booked, id
      } = req.query;
      let availableDates;

      if (id) {
        availableDates = await getAvailableDates({ id });
      } else if (startDate && endDate) {
        availableDates = await getAvailableDates({ startDate, endDate });
      } else if (booked) {
        availableDates = await getAvailableDates({ booked });
      }

      return successResponse(res, { message: 'Schedules Gotten Successfully', availableDates });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * delete a schedule and a post
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async deleteAvialableDate(req, res) {
    try {
      const { availableTime } = req;
      const { id } = availableTime;

      await deleteByKey(Schedule, { id });
      return successResponse(res, { message: 'Schedule Deleted Successfully' });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * update a date
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async updateAvialableDate(req, res) {
    try {
      const availableDate = await updateByKey(Schedule, { ...req.body }, { id: req.availableTime.id });
      return successResponse(res, { message: 'Schedule updated Successfully', availableDate });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * book a booking
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async bookSchedule(req, res) {
    try {
      const { id } = req.lecturerScheduleTime;
      const booking = await addEntity(StudentBooking, { ...req.body, scheduleId: id });
      return successResponse(res, { message: 'Booking added Successfully', booking });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * update a booking
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async updatedBookingSchedule(req, res) {
    try {
      const { id } = req.lecturerScheduleTime;
      const booking = await updateByKey(StudentBooking, { ...req.body }, { scheduleId: id, id: req.studentBookingData.id });
      return successResponse(res, { message: 'Booking updated Successfully', booking });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * delete a booking
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof EventController
   */
  async deleteBookingSchedule(req, res) {
    try {
      const booking = await deleteByKey(StudentBooking, { id: req.studentBookingData.id });
      return successResponse(res, { message: 'Booking deleted Successfully', booking });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },
  /**
   * get user profile
   * @param {object} req
   * @param {object} res
   * @returns {JSON} - A jsom response with user details
   * @memberof UserController
   */
  async getTeachers(req, res) {
    try {
      const user = await findMultipleByKey(User, { type: 'lecturer' || 'teacher' });
      return res.status(200).send(
        user
      );
    } catch (error) {
      errorResponse(res, {});
    }
  },

  /**
   * get all schedule
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async getBookingSchedule(req, res) {
    try {
      const {
        scheduleId, bookingId, startDate, endDate
      } = req.query;
      let bookings;

      if (scheduleId) {
        bookings = await getBookings({ id: scheduleId });
      } else if (startDate && endDate) {
        bookings = await getBookings({ startDate, endDate });
      } else if (bookingId) {
        bookings = await getBookings({ bookingId });
      }

      return successResponse(res, { message: 'Bookings Gotten Successfully', bookings });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * get all schedule
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async getTeacherBookings(req, res) {
    try {
      const {
        scheduleId
      } = req.query;
      let sudentBookings;

      if (scheduleId) {
        sudentBookings = await getBookings({ id: scheduleId });
      }

      return res.status(200).send(
        sudentBookings || []
      );
    } catch (error) {
      console.error(error);
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * get all schedule
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof ScheduleController
   */
  async getBookings(req, res) {
    try {
      const {
        bookingId, startDate, endDate
      } = req.query;
      let sudentBookings;

      if (bookingId) {
        sudentBookings = await getStduentsBookings({ id: bookingId });
      } else if (startDate && endDate) {
        sudentBookings = await getStduentsBookings({ startDate, endDate });
      }

      return res.status(200).send(
        sudentBookings
      );
    } catch (error) {
      console.error(error);
      errorResponse(res, { code: 500, message: error });
    }
  },
};

export default ScheduleController;
