import { DataTypes, Model } from 'sequelize';
import connection from '.';
import UserModel from './User.Model';

class UsersTasksModel extends Model {
  declare userId: number;
  declare task: string;
  declare status: string;
}

UsersTasksModel.init({
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: 'user_id',
  },
  task: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'task',
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'status',
  },
}, { sequelize: connection, tableName: 'user_tasks', timestamps: false });

UsersTasksModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

UserModel.hasMany(UsersTasksModel, { foreignKey: 'userId', as: 'user' });

export default UsersTasksModel;