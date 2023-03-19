module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    });

    Users.associate = (models) => {
      Users.hasMany(models.UserTasks, { foreignKey: 'user_id', as: 'user' });
    };

  return Users;
};