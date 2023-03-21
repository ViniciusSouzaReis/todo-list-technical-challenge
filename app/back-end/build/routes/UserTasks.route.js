"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkAuthorization_1 = require("../middlewares/checkAuthorization");
const UserTasks_controller_1 = require("../controller/UserTasks.controller");
const router = (0, express_1.Router)();
const userTasksController = new UserTasks_controller_1.default();
router.get('/:id', checkAuthorization_1.default, userTasksController.getIdTask);
router.post('/register/:id', checkAuthorization_1.default, userTasksController.create);
router.delete('/delete/:id/:data', checkAuthorization_1.default, userTasksController.deleteTask);
router.patch('/update/:id', checkAuthorization_1.default, userTasksController.updateTask);
exports.default = router;
//# sourceMappingURL=UserTasks.route.js.map