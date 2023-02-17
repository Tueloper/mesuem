/* eslint-disable import/extensions */
import { Router } from 'express';
import { Bouncers, TicketMiddleware } from '../middlewares';
import { TicketController } from '../controller';

const router = Router();
const {
  inidividualBouncers,
  adminBouncers
} = Bouncers;
const {
  validateTicketPayload,
  verifyTicket,
} = TicketMiddleware;
const {
  buyTicket,
  // makeTicketPayment,
  verifyPayment,
  // verificationCheck,
  // getAllTickets,
} = TicketController;

router.post('/book', inidividualBouncers, validateTicketPayload, buyTicket);
// router.patch('/buy', userBouncers, verifyTicket, makeTicketPayment); // ?ticketid=[]
router.post('/verify', adminBouncers, verifyTicket, verifyPayment); // ?ticketCode=[]
// router.get('/verification', userBouncers, verificationCheck); // ?ticketCode=[]
// router.get('/', adminBouncers, verifyIds, getAllTickets); // ticketId=[]

export default router;
