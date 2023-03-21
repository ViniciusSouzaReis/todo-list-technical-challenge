"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkAuthorization_1 = require("../middlewares/checkAuthorization");
const Token_controller_1 = require("../controller/Token.controller");
const router = (0, express_1.Router)();
const tokenController = new Token_controller_1.default();
router.post('/', checkAuthorization_1.default, tokenController.checkToken);
exports.default = router;
//# sourceMappingURL=Token.route.js.map