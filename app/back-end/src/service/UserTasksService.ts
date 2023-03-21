import UsersTasksModel from '../database/models/UsersTasks.Model';
import { IUpdateData } from '../interfaces/UpdateData.interface';

class UsersTasksService {
  constructor(private _tasksInfo = UsersTasksModel) {}

  async getUserTasks(id: number) {
    const getUser = await this._tasksInfo.findAll({ 
    where: { user_id: id },
    attributes: { exclude: ['user_id', 'userId'] },
  });

  if (getUser.length < 1) return { type: 404, message: 'Tasks not found' };

  return { type: 200, message: getUser };

  };

  private async checkExistTask(id: string, data: string) {
    const getTask = await this._tasksInfo.findOne({ where: { user_id: id, task: data } });
    return getTask;
  };

  async createTask(id: string, data: string) {
    const checkTask = await this.checkExistTask(id, data);

    if (checkTask) return { type: 409, message: 'Task already exists!' };
    
    const newTask = {
      userId: id,
      task: data,
      status: 'A fazer',
    };
  
    await this._tasksInfo.create(newTask);
  
    return { type: 201, message: 'Task created!' };
  };

  async deleteTasks(id: number, data: string) {
    const getTask = await this._tasksInfo.destroy({ where: { user_id: id, task: data } });
    return getTask;
  };

  async updateTaskStatus(id: number, data: IUpdateData) {
    const updatedTask = await this._tasksInfo.update(
      { status: data.value },
      { where: { user_id: id, task: data.task } },
      );
  
      return updatedTask;
  };
}

export default UsersTasksService;