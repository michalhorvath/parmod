import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import db from './utils/db';
db.connect();

import apiRouter from './routes/api';
import unknownEndpoint from './middleware/unknownEndpoint';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Parmod');
});

app.use('/api/v1/', apiRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
