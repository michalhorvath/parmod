import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';

import db from './utils/db';
db.connect();

import apiRouter from './routes/api';
import unknownEndpoint from './middleware/unknownEndpoint';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
morganBody(app);

app.use(express.static('buildclient'));
app.use('/api/v1/', apiRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
