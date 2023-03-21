"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'name',
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'email',
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'password',
    },
}, { sequelize: _1.default, tableName: 'users', timestamps: false });
exports.default = UserModel;
//# sourceMappingURL=User.Model.js.map