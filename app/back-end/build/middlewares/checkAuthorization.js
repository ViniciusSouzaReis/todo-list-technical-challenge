"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = require("../auth/JWT");
const jwt = new JWT_1.default();
const checkAuthorization = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.checkToken(token);
        if (decoded)
            next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};
exports.default = checkAuthorization;
//# sourceMappingURL=checkAuthorization.js.map