"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersTasks_Model_1 = require("../database/models/UsersTasks.Model");
class UsersTasksService {
    constructor(_tasksInfo = UsersTasks_Model_1.default) {
        this._tasksInfo = _tasksInfo;
    }
    async getUserTasks(id) {
        const getUser = await this._tasksInfo.findAll({
            where: { user_id: id },
            attributes: { exclude: ['user_id', 'userId'] },
        });
        if (getUser.length < 1)
            return { type: 404, message: 'Tasks not found' };
        return { type: 200, message: getUser };
    }
    ;
    async checkExistTask(id, data) {
        const getTask = await this._tasksInfo.findOne({ where: { user_id: id, task: data } });
        return getTask;
    }
    ;
    async createTask(id, data) {
        const checkTask = await this.checkExistTask(id, data);
        if (checkTask)
            return { type: 409, message: 'Task already exists!' };
        const newTask = {
            userId: id,
            task: data,
            status: 'A fazer',
        };
        await this._tasksInfo.create(newTask);
        return { type: 201, message: 'Task created!' };
    }
    ;
    async deleteTasks(id, data) {
        const getTask = await this._tasksInfo.destroy({ where: { user_id: id, task: data } });
        return getTask;
    }
    ;
    async updateTaskStatus(id, data) {
        const updatedTask = await this._tasksInfo.update({ status: data.value }, { where: { user_id: id, task: data.task } });
        return updatedTask;
    }
    ;
}
exports.default = UsersTasksService;
//# sourceMappingURL=UserTasksService.js.map