import { Router } from "express";
import * as userController from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authController.createUser);

router.post('/login', authController.login);

router.get('/getusers', userController.getUsers);

router.get('/getuser/:id', userController.getUserById);

router.put('/updateuser/:id', userController.updateUser);

router.delete('/deleteuser/:id', userController.deleteUser);

export default router;

