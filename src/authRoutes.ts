import { Router } from 'express';
import * as authController from './authController';

const authRouter = Router();

authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/reset-password/:token', authController.resetPassword);

export default authRouter;
