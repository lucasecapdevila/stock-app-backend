import mongoose, { Connection } from "mongoose";
import 'dotenv/config';

const mongoURI = process.env.MONGODB_URI as string;

mongoose.connect(mongoURI)

const connectionData: Connection = mongoose.connection;
connectionData.once('open', () => {
  console.log('MongoDB connected successfully');
})