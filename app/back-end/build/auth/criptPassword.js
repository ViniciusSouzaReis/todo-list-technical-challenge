"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const criptPassword = (password) => bcrypt.hashSync(password, 10);
exports.default = criptPassword;
//# sourceMappingURL=criptPassword.js.map