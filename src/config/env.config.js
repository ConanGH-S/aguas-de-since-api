import { config } from 'dotenv';

config();

export default {
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  appPort: process.env.APP_PORT,
  secretKey: process.env.SECRET_KEY,
};
