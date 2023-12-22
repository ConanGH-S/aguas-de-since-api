import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as router from './routes/router.js';

const app = express();

const CORSOPTIONS = {
  origin: 'http://localhost:3001',
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PATCH'],
  optionsSuccessStatus: 200,
};

app.use(cors(CORSOPTIONS));

app.use(cookieParser());
app.use(express.json());

const APIPREFFIX = '/api';

const appRoutes = Object.values(router);

app.use(APIPREFFIX, appRoutes);

export default app;
