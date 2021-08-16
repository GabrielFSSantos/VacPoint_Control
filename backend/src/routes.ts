import {Router} from 'express';

import authMiddleware from './middleware/ensureAuthenticated';
import AdministratorController from './controllers/AdministratorController';
import EmployeeController from './controllers/EmployeeController';
import VaccineController from './controllers/VaccineController';
import PostController from './controllers/PostController';

const publicRouter = Router();
const privateRouter = Router();
privateRouter.use(authMiddleware);

publicRouter.post('/administrators/login', AdministratorController.login);
privateRouter.post('/administrators/logout', AdministratorController.logout);

privateRouter.post('/employees/create', EmployeeController.create);
privateRouter.get('/employees/read', EmployeeController.read);
privateRouter.put('/employees/update', EmployeeController.update);
privateRouter.delete('/employees/delete', EmployeeController.delete);
privateRouter.get('/employees/show', EmployeeController.show);
privateRouter.get('/employees/readToVaccines', EmployeeController.readToVaccines);
privateRouter.put('/employees/updateToVaccines', EmployeeController.updateToVaccines);

privateRouter.post('/vaccines/create', VaccineController.create);
privateRouter.get('/vaccines/read', VaccineController.read);
privateRouter.put('/vaccines/update', VaccineController.update);
privateRouter.delete('/vaccines/delete', VaccineController.delete);
privateRouter.get('/vaccines/show', VaccineController.show);

privateRouter.post('/posts/create', PostController.create);
publicRouter.get('/posts/read', PostController.read);
privateRouter.put('/posts/update', PostController.update);
privateRouter.delete('/posts/delete', PostController.delete);
privateRouter.get('/posts/show/:id', PostController.show);

export default [publicRouter, privateRouter];
