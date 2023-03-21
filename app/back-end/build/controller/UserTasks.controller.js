"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserTasksService_1 = require("../service/UserTasksService");
class UserTasksController {
    constructor(_serviceUsersTasks = new UserTasksService_1.default()) {
        this._serviceUsersTasks = _serviceUsersTasks;
        this.getIdTask = async (req, res) => {
            const { id } = req.params;
            const { type, message } = await this._serviceUsersTasks.getUserTasks(Number(id));
            return res.status(type).json(message);
        };
        this.create = async (req, res) => {
            const { data } = req.body;
            const { id } = req.params;
            const { type, message } = await this._serviceUsersTasks.createTask(id, data);
            return res.status(type).json(message);
        };
        this.deleteTask = async (req, res) => {
            const { id, data } = req.params;
            await this._serviceUsersTasks.deleteTasks(Number(id), data);
            return res.status(200).end();
        };
        this.updateTask = async (req, res) => {
            const { id } = req.params;
            const { data } = req.body;
            await this._serviceUsersTasks.updateTaskStatus(Number(id), data);
            return res.status(200).end();
        };
    }
}
exports.default = UserTasksController;
//# sourceMappingURL=UserTasks.controller.js.map