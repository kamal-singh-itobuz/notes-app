import { Router } from 'express';
import {registerController, loginController, currentUserController} from '../controllers/usersController.js';
import tokenValidateHandler from '../middlewares/tokenValidatehandler.js';

const router = Router();
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/current', tokenValidateHandler, currentUserController);

export default router;