import express from 'express';
//import cors from 'cors';

//import security from './middleware/security';
//import routes from './routes';


const app = express();

//app.use(security);
//app.use(cors({ origin: 'http://bolao.sorte'},SupportsCredentials = true));    //  Frontend que pode acessar API
//app.use(cors());

//app.use(express.json());
//app.use(routes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});