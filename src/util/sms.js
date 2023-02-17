import env from '../config/env';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  // TWILIO_NUMBER,
  TWILO_MESSAGE_SERVICE_SID
} = env;
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const SMSLIER = {
  /**
   * send sms verification token to user after signup
   * @param {object} code - OTP token
   * @param {object} phoneNumber -number to send the code to
   * @returns {Promise<boolean>} - Returns true if mail is sent, false if not
   * @memberof Mailer
   */
  async sendVerificationToken(code, phoneNumber) {
    try {
      const to = `+1${Number(phoneNumber)}`;
      // c
      const sms = await client.messages.create(
        {
          body: `Meseum Ticket Verification Code: ${code}`,
          messagingServiceSid: TWILO_MESSAGE_SERVICE_SID,
          to
        }
      );

      if (sms) return true;
    } catch (error) {
      return false;
    }
  },
};

export default SMSLIER;
