import { RequestHandler } from 'express';
import UsersTasksService from '../service/UserTasksService';

class UserTasksController {
  constructor(private _serviceUsersTasks = new UsersTasksService()) {}

  getIdTask: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const { type, message } = await this._serviceUsersTasks.getUserTasks(Number(id));

    return res.status(type).json(message);
  };

  create: RequestHandler = async (req, res) => {
    const { data } = req.body;
    const { id } = req.params;

    const { type, message } = await this._serviceUsersTasks.createTask(id, data);

    return res.status(type).json(message);
  };

  deleteTask: RequestHandler = async (req, res) => {
    const { id, data } = req.params;
    await this._serviceUsersTasks.deleteTasks(Number(id), data);
  
    return res.status(200).end();
  };

  updateTask: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
  
    await this._serviceUsersTasks.updateTaskStatus(Number(id), data);
  
    return res.status(200).end();
  };
}

export default UserTasksController;