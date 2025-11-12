import express from 'express';
import {postAuth, getMe} from '../controllers/auth-controller.js'
import {authenticateToken} from '../../middlewares/authentication.js';

const authRouter = express.Router();

authRouter.route('/login').post(postAuth);

authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
