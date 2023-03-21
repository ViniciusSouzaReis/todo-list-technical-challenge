"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Register_controller_1 = require("../controller/Register.controller");
const router = (0, express_1.Router)();
const registerController = new Register_controller_1.default();
router.post('/', registerController.register);
exports.default = router;
//# sourceMappingURL=Register.route.js.map