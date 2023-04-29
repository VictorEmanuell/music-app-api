import { Router } from 'express';

import UserController from '../controllers/UserController';

import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router
	.route('/user')
	.post(UserController.create)
	.get(AuthMiddleware, UserController.get)
	.put(AuthMiddleware, UserController.update)
	.delete(AuthMiddleware, UserController.delete);

export default router;