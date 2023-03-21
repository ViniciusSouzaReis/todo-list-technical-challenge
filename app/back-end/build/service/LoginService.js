"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_Model_1 = require("../database/models/User.Model");
const JWT_1 = require("../auth/JWT");
const md5 = require('md5');
class LoginService {
    constructor(_userInfo = User_Model_1.default) {
        this._userInfo = _userInfo;
        this._jwt = new JWT_1.default();
    }
    async findUser(email) {
        const result = await this._userInfo.findOne({ where: { email } });
        return result;
    }
    async login({ email, password }) {
        const userInfo = await this.findUser(email);
        if (!userInfo)
            return { type: 404, message: 'User not found' };
        const cryptPassword = md5(password);
        if (cryptPassword === userInfo.password) {
            const token = this._jwt.generateToken({ email, password: cryptPassword });
            return { type: 200,
                message: {
                    id: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    token,
                } };
        }
        return { type: 404, message: 'Incorrect password' };
    }
}
exports.default = LoginService;
//# sourceMappingURL=LoginService.js.map