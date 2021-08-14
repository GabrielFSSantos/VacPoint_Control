import {Router} from 'express';

import authMiddleware from './middleware/ensureAuthenticated';
import AdministratorController from './controllers/AdministratorController';

const publicRouter = Router();
const privateRouter = Router();
privateRouter.use(authMiddleware);

///  ROUTES DEV - ADMINISTRATOR - CRUD
publicRouter.post('/administrators/login', AdministratorController.login);
publicRouter.post('/administrators/logout', AdministratorController.logout);

export default [publicRouter, privateRouter];
