import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT){
  throw new Error('Parameter PORT is invalid or missing.');
}
const PORT = process.env.PORT;

if (!process.env.MONGODB_URI){
  throw new Error('Parameter MONGODB_URI is invalid or missing.');
}
const MONGODB_URI = process.env.MONGODB_URI;

if (!process.env.TOKEN_KEY){
  throw new Error('Parameter TOKEN_KEY is invalid or missing.');
}
const TOKEN_KEY = process.env.TOKEN_KEY;

if (!process.env.MAILER_SERVICE){
  throw new Error('Parameter MAILER_SERVICE is invalid or missing.');
}
const MAILER_SERVICE = process.env.MAILER_SERVICE;

if (!process.env.MAILER_USER){
  throw new Error('Parameter MAILER_USER is invalid or missing.');
}
const MAILER_USER = process.env.MAILER_USER;

if (!process.env.MAILER_PASS){
  throw new Error('Parameter MAILER_PASS is invalid or missing.');
}
const MAILER_PASS = process.env.MAILER_PASS;

export default { 
  PORT, 
  MONGODB_URI,
  TOKEN_KEY,
  MAILER_SERVICE,
  MAILER_USER,
  MAILER_PASS
};
