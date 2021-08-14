import {Router} from 'express';

import authMiddleware from './middleware/ensureAuthenticated';
import AdministratorController from './controllers/AdministratorController';
import EmployeeController from './controllers/EmployeeController';

const publicRouter = Router();
const privateRouter = Router();
privateRouter.use(authMiddleware);

publicRouter.post('/administrators/login', AdministratorController.login);
publicRouter.post('/administrators/logout', AdministratorController.logout);

publicRouter.post('/employees/create', EmployeeController.create);
publicRouter.get('/employees/read', EmployeeController.read);

export default [publicRouter, privateRouter];
