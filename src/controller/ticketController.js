/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { GeneralService } from '../services';
import { Toolbox, Payment, Sms } from '../util';
import database from '../models';

const {
  successResponse,
  errorResponse,
  generateTicketCode
} = Toolbox;
const {
  viaPaystack,
  validatePaystack
} = Payment;
const {
  sendVerificationToken
} = Sms;
const {
  addEntity,
  updateByKey,
  findByKey,
  findMultipleByKey
} = GeneralService;

const {
  Ticket,
  // User,
} = database;

const TicketController = {
  /**
   * buy a movie ticket
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof TicketController
   */
  async buyTicket(req, res) {
    try {
      const {
        id, name, email, phoneNumber
      } = req.tokenData;
      // const { ticket } = req;
      let ticket;

      if (req.ticketData) {
        ticket = await updateByKey(Ticket, { quantity: req.body.quantity }, { id: req.ticketData.id });
      } else {
        const ticketCode = await generateTicketCode(name);
        // const price = Number(req.body.quantity) * movie.ticketPrice * movie.discount;
        const price = Number(req.body.quantity) * 100;
        ticket = await addEntity(Ticket, {
          ...req.body,
          userId: id,
          price,
          ticketCode,
          booked: true,
          dateOfEntry: req.body.dateOfEntry,
        });
      }
      const { ticketCode, price, quantity } = ticket;
      const metadata = {
        ticketCode,
        quantity,
        name,
      };
// return console.log()
      // TODO: Uncomment code below before production
      const payload = {
        email,
        amount: Number(price) * 100,
        metadata,
      };

      // return console.log(payload);
      let paystack = await viaPaystack(payload);
      if (!paystack.status) errorResponse(res, { code: 400, message: paystack.message });
      paystack = paystack.data;
      await updateByKey(Ticket, {
        paystackReference: paystack.reference,
        verified: true,
        verifiedTime: new Date().getDate(),
      }, { id: ticket.id });
      const ress = { ...ticket.dataValues, paystack };

      // TODO - UNCOMMENT FOR PRODUCTION
      // Send the Token to User Via SMS
      await sendVerificationToken(ticketCode, phoneNumber);
      return res.status(201).send(
        ress
      );
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * verify a movie ticket
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof TicketController
   */
  async verifyPayment(req, res) {
    try {
      const { ticket } = req;
      // console.log(ticket);
      const { paystackReference } = ticket;

      if (!paystackReference || paystackReference === null) return errorResponse(res, { code: '400', message: 'Payment has not be made yet' });
      const check = await validatePaystack(paystackReference);
      const { status } = check.data;
      // console.log(status);
      if (status === 'abandoned') return errorResponse(res, { code: '400', message: 'Error with Payment, Please book ticket again, also complete payment!' });
      if (status === 'failed') {
        await updateByKey(Ticket, { paymentStatus: 'rejected' }, { id: ticket.id });
        return errorResponse(res, { code: '400', message: 'Payment Failed, Please Try again!' });
      }
      if (status === 'success') {
        await updateByKey(Ticket, {
          paymentStatus: 'completed',
          verified: true
        }, { id: ticket.id });
      }

      return res.status(200).send(
        ticket
      );
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * verify a movie ticket
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof TicketController
   */
  async verificationCheck(req, res) {
    try {
      const { ticketCode } = req.query;
      const ticket = await findByKey(Ticket, { ticketCode });
      if (!ticket) return errorResponse(res, { code: '404', message: 'Error with Ticket, Ticket is Invalid!' });
      return successResponse(res, { message: 'Verification Successful', ticket });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  // /**
  //  * get tickets
  //  * @async
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {JSON} a JSON response with user details and Token
  //  * @memberof TicketController
  //  */
  // async getAllTickets(req, res) {
  //   try {
  //     let tickets;
  //     let numberOfTicketSold = 0;
  //     let numberOfTicketsRemaining = 0;

  //     if (req.query.movieId) {
  //       tickets = await getMovieTicketByKey({ id: req.query.movieId });
  //       if (!tickets) return errorResponse(res, { code: 404, message: 'No ticket found' });
  //       const ticketss = tickets.tickets.map((item) => item.quantity);
  //       numberOfTicketSold = ticketss.reduce((a, b) => Number(a + b), numberOfTicketSold);
  //       numberOfTicketsRemaining = Number(tickets.numberOfTickets - numberOfTicketSold);
  //       if (!tickets) return errorResponse(res, { code: '404', message: 'No Purchase made for this movie' });
  //     } else if (req.query.eventId) {
  //       tickets = await getEventTicketByKey({ id: req.query.eventId });
  //       if (!tickets) return errorResponse(res, { code: 404, message: 'No ticket found' });
  //       const ticketss = tickets.tickets.map((item) => item.quantity);
  //       numberOfTicketSold = ticketss.reduce((a, b) => Number(a + b), numberOfTicketSold);
  //       numberOfTicketsRemaining = Number(tickets.numberOfTickets - numberOfTicketSold);
  //       if (!tickets) return errorResponse(res, { code: '404', message: 'No Purchase made for this event' });
  //     } else {
  //       tickets = await getTicketByKey({});
  //       if (!tickets.length) return errorResponse(res, { code: '404', message: 'No Purchase made at all' });
  //       // numberOfTicketSold = tickets.reduce((a, b) => Number(a.quantity + b.quantity), numberOfTicketSold);
  //       // numberOfTicketsRemaining = Number(tickets.numberOfTickets - numberOfTicketSold);
  //     }

  //     const data = {
  //       tickets,
  //       numberOfTicketSold,
  //       numberOfTicketsRemaining,
  //       isAvailable: numberOfTicketsRemaining === 0,
  //     };

  //     return successResponse(res, { message: 'Tickets Gotten Successfully', data });
  //   } catch (error) {
  //     console.error(error);
  //     errorResponse(res, { code: 500, message: error });
  //   }
  // },

  /**
   * get personal tickets
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof TicketController
   */
  async getPersonalTickets(req, res) {
    try {
      let tickets;
      const { id } = req.tokenData;

      if (req.query.ticketId) tickets = await findMultipleByKey(Ticket, { id: req.query.ticketId, userId: id });
      else tickets = await findMultipleByKey(Ticket, { userId: id });

      if (tickets.length < 1) return errorResponse(res, { code: 404, message: 'Tickets does not exist' });

      return successResponse(res, { message: 'Tickets Gotten Successfully', tickets });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  },

  /**
   * buy add payment
   * @async
   * @param {object} req
   * @param {object} res
   * @returns {JSON} a JSON response with user details and Token
   * @memberof TicketController
   */
  async makeTicketPayment(req, res) {
    try {
      const { email, name } = req.tokenData;
      const { ticket } = req;
      const { ticketCode, price, quantity } = ticket;
      const metadata = {
        ticketCode,
        quantity,
        name,
      };

      // TODO: Uncomment code below before production
      const payload = {
        email,
        amount: Number(price) * 100,
        metadata,
      };

      // return console.log(payload);
      let paystack = await viaPaystack(payload);
      if (!paystack.status) errorResponse(res, { code: 400, message: paystack.message });
      paystack = paystack.data;
      await updateByKey(Ticket, { paystackReference: paystack.reference }, { id: ticket.id });
      return successResponse(res, { message: 'Tickets Purchased Successfully', paystack });
    } catch (error) {
      errorResponse(res, { code: 500, message: error });
    }
  }
};

export default TicketController;
