/* eslint-disable max-len */
import { GeneralValidation } from '../validation';
import { Toolbox } from '../util';
import { GeneralService } from '../services';
import database from '../models';

const {
  errorResponse,
  successResponse
} = Toolbox;
const {
  validateId,
  validateEventTickets,
  validateParameters
} = GeneralValidation;
const {
  findByKey
} = GeneralService;
const {
  Movie,
  Event,
  Ticket
} = database;

const TicketMiddleware = {
  /**
   * middleware for validating tickets
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof TicketMiddleware
   */
  async validateTicketPayload(req, res, next) {
    try {
      const ticket = await findByKey(Ticket, { userId: req.tokenData.id });
      if (ticket) {
        const { paymentStatus } = ticket;
        if (paymentStatus === 'success') return errorResponse(res, { code: 401, message: 'You still have a valid ticket' });
        req.ticketData = ticket;
      }
      req.ticketData = ticket;

      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware for validating tickets
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof TicketMiddleware
   */
  async validateEventTicketPayload(req, res, next) {
    try {
      validateEventTickets(req.body);
      if (req.body.eventId) {
        const event = await findByKey(Event, { id: req.body.eventId });
        if (!event) return errorResponse(res, { code: '404', message: 'Event is not found' });
        if (!event.isAvialable) return errorResponse(res, { code: '404', message: 'Event Ticket Exhausted' });
        if (event.numberOfTickets < Number(req.body.quantity)) return errorResponse(res, { code: '404', message: 'Event Ticket is not enough for purchase' });

        const ticket = await findByKey(Ticket, { userId: req.tokenData.id, eventId: req.body.eventId });
        if (ticket) {
          const { paymentStatus } = ticket;
          if (paymentStatus !== 'pending') return errorResponse(res, { code: 401, message: 'You already have bought ticket(s) for this event' });
          req.ticketData = ticket;
        }
        req.event = event;
      }
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware for validating query payloads
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof TicketMiddleware
   */
  async verifyIds(req, res, next) {
    try {
      validateParameters(req.query);
      if (req.query.eventId) {
        const event = await findByKey(Event, { id: req.query.eventId });
        if (!event) return errorResponse(res, { code: '404', message: 'Event is not found' });
      }
      if (req.query.movieId) {
        const movie = await findByKey(Movie, { id: req.query.movieId });
        if (!movie) return errorResponse(res, { code: '404', message: 'Movie is not found' });
      }
      next();
    } catch (error) {
      console.error(error);
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware for validating tickets
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof TicketMiddleware
   */
  async verifyTicket(req, res, next) {
    try {
      const { ticketCode } = req.query;
      if (ticketCode) {
        const ticket = await findByKey(Ticket, { ticketCode });
        if (!ticket) return errorResponse(res, { code: '404', message: 'Ticket is invalid' });
        if (ticket.paymentStatus === 'completed') return successResponse(res, { message: 'Ticket is already confirmed', ticket });
        req.ticket = ticket;
      }
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },

  /**
   * middleware for validating tickets
   * @async
   * @param {object} req - the api request
   * @param {object} res - api response returned by method
   * @param {object} next - returned values going into next function
   * @returns {object} - returns error or response object
   * @memberof TicketMiddleware
   */
  async verifyPersonalTickets(req, res, next) {
    try {
      const { ticketId } = req.query;
      if (ticketId) {
        validateId({ id: ticketId });
        const ticket = await findByKey(Ticket, { id: ticketId });
        if (!ticket) return errorResponse(res, { code: '404', message: 'Ticket is invalid' });
        req.ticket = ticket;
      }
      next();
    } catch (error) {
      errorResponse(res, { code: 400, message: error });
    }
  },
};

export default TicketMiddleware;
