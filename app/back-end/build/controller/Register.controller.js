"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterService_1 = require("../service/RegisterService");
class RegisterController {
    constructor(_serviceLogin = new RegisterService_1.default()) {
        this._serviceLogin = _serviceLogin;
        this.register = async (req, res) => {
            const { name, email, password } = req.body;
            const { type, message } = await this._serviceLogin.createUser({ name, email, password });
            return res.status(type).json(message);
        };
    }
}
exports.default = RegisterController;
//# sourceMappingURL=Register.controller.js.map