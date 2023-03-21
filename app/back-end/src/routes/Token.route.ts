import { Router } from 'express';
import checkAuthorization from '../middlewares/checkAuthorization';
import TokenController from '../controller/Token.controller';

const router = Router();
const tokenController = new TokenController();

router.post('/', checkAuthorization, tokenController.checkToken);

export default router;