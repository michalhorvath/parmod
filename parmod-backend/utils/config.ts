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

export default { 
  PORT, 
  MONGODB_URI,
  TOKEN_KEY
};
