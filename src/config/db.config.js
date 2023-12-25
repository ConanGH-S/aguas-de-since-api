import { Sequelize } from 'sequelize';
import envConfig from './env.config.js';

const sequelize = new Sequelize(envConfig.dbName, envConfig.dbUser, envConfig.dbPassword, {
  host: envConfig.dbHost,
  dialect: 'mysql',
});

export default sequelize;
