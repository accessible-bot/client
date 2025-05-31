import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware'; 

const userRoutes = Router();

userRoutes.post('/users', UserController.create);
userRoutes.post('/login', UserController.login); 

userRoutes.get('/users', authMiddleware, UserController.getAll);
userRoutes.get('/users/:id', authMiddleware, UserController.getUser);
userRoutes.put('/users/:id', authMiddleware, UserController.update);

export default userRoutes;
