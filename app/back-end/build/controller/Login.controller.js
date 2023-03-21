"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginService_1 = require("../service/LoginService");
class LoginController {
    constructor(_serviceLogin = new LoginService_1.default()) {
        this._serviceLogin = _serviceLogin;
        this.login = async (req, res) => {
            const { email, password } = req.body;
            const { type, message } = await this._serviceLogin.login({ email, password });
            return res.status(type).json(message);
        };
    }
}
exports.default = LoginController;
//# sourceMappingURL=Login.controller.js.map