import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import security from './middleware/security';
//import routes from './routes';

const app = express();

app.use(security);
//app.use(cors({ origin: 'http://localhost'}, SupportsCredentials = true));
app.use(cors());

app.use(express.json());
//app.use(routes);

dotenv.config();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});