import { Router } from 'express';
import RegisterController from '../controller/Register.controller';

const router = Router();
const registerController = new RegisterController();

router.post('/', registerController.register);

export default router;