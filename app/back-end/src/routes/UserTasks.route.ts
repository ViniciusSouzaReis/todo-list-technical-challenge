import { Router } from 'express';
import checkAuthorization from '../middlewares/checkAuthorization';
import UserTasksController from '../controller/UserTasks.controller';

const router = Router();
const userTasksController = new UserTasksController();

router.get('/:id', checkAuthorization, userTasksController.getIdTask);
router.post('/register/:id', checkAuthorization, userTasksController.create);
router.delete('/delete/:id/:data', checkAuthorization, userTasksController.deleteTask);
router.patch('/update/:id', checkAuthorization, userTasksController.updateTask);

export default router;