import dotenv from 'dotenv';
import mongoose, { Connection } from 'mongoose';

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI as string
);

const db: Connection = mongoose.connection;

export default db;
