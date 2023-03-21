import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;
if (!url || typeof url !== 'string'){
  throw new Error('MONGODB_URI is not set');
}

mongoose.set('strictQuery', false);

const connect = () => {
  mongoose
    .connect(url)
    .then(_result => { console.log('connected to MongoDB'); })
    .catch((error) => { console.log('error connecting to MongoDB:', error.message); });
};

export default { connect };
