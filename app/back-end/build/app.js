"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
const Login_route_1 = require("./routes/Login.route");
const Register_route_1 = require("./routes/Register.route");
const Token_route_1 = require("./routes/Token.route");
const UserTasks_route_1 = require("./routes/UserTasks.route");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.app.get('/', (req, res) => res.json({ ok: true }));
        this.app.use('/login', Login_route_1.default);
        this.app.use('/register', Register_route_1.default);
        this.app.use('/token', Token_route_1.default);
        this.app.use('/tasks', UserTasks_route_1.default);
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
exports.app = new App().app;
//# sourceMappingURL=app.js.map