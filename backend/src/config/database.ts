import dotenv from 'dotenv';
dotenv.config();

export default {
  database: process.env.DB_HOST,
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
};

