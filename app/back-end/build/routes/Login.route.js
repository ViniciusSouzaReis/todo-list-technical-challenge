"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = require("../controller/Login.controller");
const router = (0, express_1.Router)();
const loginController = new Login_controller_1.default();
router.post('/', loginController.login);
exports.default = router;
//# sourceMappingURL=Login.route.js.map