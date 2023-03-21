"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const User_Model_1 = require("./User.Model");
class UsersTasksModel extends sequelize_1.Model {
}
UsersTasksModel.init({
    userId: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        field: 'user_id',
    },
    task: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'task',
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'status',
    },
}, { sequelize: _1.default, tableName: 'user_tasks', timestamps: false });
UsersTasksModel.belongsTo(User_Model_1.default, { foreignKey: 'userId', as: 'user' });
User_Model_1.default.hasMany(UsersTasksModel, { foreignKey: 'userId', as: 'user' });
exports.default = UsersTasksModel;
//# sourceMappingURL=UsersTasks.Model.js.map