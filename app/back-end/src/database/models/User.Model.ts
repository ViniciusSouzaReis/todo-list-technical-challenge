import { DataTypes, Model } from 'sequelize';
import connection from '.';
import UsersTasksModel from './UsersTasks.Model';

class UserModel extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'name',
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'email',
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'password',
  },
}, { sequelize: connection, tableName: 'users', timestamps: false });


export default UserModel;