"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_Model_1 = require("../database/models/User.Model");
const md5 = require('md5');
class RegisterService {
    constructor(_userInfo = User_Model_1.default) {
        this._userInfo = _userInfo;
    }
    async findUser(email) {
        const result = await this._userInfo.findOne({ where: { email } });
        return result;
    }
    async createUser({ name, email, password }) {
        const userInfo = await this.findUser(email);
        if (userInfo)
            return { type: 409, message: { message: 'User already exists' } };
        const cryptPassword = md5(password);
        const newUser = {
            name,
            email,
            password: cryptPassword,
        };
        await this._userInfo.create(newUser);
        return { type: 201, message: 'User created!' };
    }
}
exports.default = RegisterService;
//# sourceMappingURL=RegisterService.js.map