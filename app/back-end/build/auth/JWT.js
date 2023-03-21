"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class JWT {
    constructor() {
        this._secretKey = process.env.JWT_SECRET || 'jwt_secret';
        this._jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    }
    generateToken(login) {
        const token = jwt.sign({ ...login }, this._secretKey, this._jwtConfig);
        return token;
    }
    checkToken(token) {
        const decoded = jwt.verify(token, this._secretKey);
        return decoded;
    }
}
exports.default = JWT;
//# sourceMappingURL=JWT.js.map