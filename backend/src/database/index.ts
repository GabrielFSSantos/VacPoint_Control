import mongoose, { Mongoose } from 'mongoose';
import dbConfig from '../config/database';

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(dbConfig.database || '', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    keepAlive: true,
    useFindAndModify: false,
  });

export const close = (): Promise<void> => mongoose.connection.close();