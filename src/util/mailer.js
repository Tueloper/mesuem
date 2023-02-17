/* eslint-disable valid-jsdoc */
import nodemailer from 'nodemailer';
import { env } from '../config';

const {
  ADMIN_EMAIL, PASSWORD
} = env;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // true for 465, false for other ports
  auth: {
    user: ADMIN_EMAIL, // generated ethereal user
    pass: PASSWORD, // generated ethereal password
  },
});

const Mailer = {
  /**
   * send email for password reset
   * @param {object} req
   * @param {object} user
   * @param {object} vendor
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendWelcomeEmail(user) {
    const {
      email, name,
    } = user;
console.log(user);
    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      subject: `Welcome ${name.toUpperCase()}`,
      html: `<p>We humbly welcome you to ISchdule application, where you can easily book a session with your favaorite lecturer</p><br><br>
      <p>I hope you have a great time with using this appliation.</p><br><br>
      <p>Get the app, and get started 😊.</p>
      `
    };
    try {
      await transporter.sendMail(mail);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  /**
   * send email verification to user after signup
   * @param {object} req
   * @param {object} user - { id, email, firstName ...etc}
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendNotificationEmail(user, lecturer, schedule) {
    const { email } = user;
    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'YOUR BOOKING WAS SUCCESSFULL',
      html: `<p> Your schedule with Prof. ${lecturer.name} was a success, please ensure to be timely and be there 5 minutes before your time.\n
      Thank you for your continous patronage. \n
      Your schedule is from ${schedule.startTime} to ${schedule.endTime}
        I hope you have a great time with using this appliation.</p><br><br>
       
      `
    };
    try {
      await transporter.sendMail(mail);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * send email verification to user after signup
   * @param {object} req
   * @param {object} user - { id, email, firstName ...etc}
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendAppointMail(lecturer, schedule) {
    const { email } = lecturer;
    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      subject: 'Your Appointment WAS SUCCESSFULL',
      html: `<p> Good Day ${lecturer.name}, your fixed appointment was a success, please ensure to be timely and be there 5 minutes before your time.\n
      Thank you for your continous patronage. \n
      Your schedule is from ${schedule.startTime} to ${schedule.endTime}
        I hope you have a great time with using this appliation.</p><br><br>
       
      `
    };
    try {
      await transporter.sendMail(mail);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default Mailer;
