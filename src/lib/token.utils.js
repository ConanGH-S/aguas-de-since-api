import jwt from 'jsonwebtoken';
import envConfig from '../config/env.config.js';

export const createToken = (payload = {}) => jwt.sign({ payload }, envConfig.secretKey, { algorithm: 'HS256', expiresIn: '1h' });

export const verifyToken = () => ({
  msg: 'ERROR',
});
