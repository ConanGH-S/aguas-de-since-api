import nodemailer from 'nodemailer';
import envConfig from './env.config.js';

export default nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: envConfig.mailUser,
    pass: envConfig.mailPassword,
  },
});
