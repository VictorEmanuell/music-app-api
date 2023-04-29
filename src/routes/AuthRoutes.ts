import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const router = Router();

router
	.route('/auth')
	.post(AuthController.auth);

export default router;