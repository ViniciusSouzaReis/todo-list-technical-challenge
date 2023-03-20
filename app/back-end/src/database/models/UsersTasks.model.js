module.exports = (sequelize, DataTypes) => {
  const UserTasks = sequelize.define('UserTasks', {
    userId: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      references: { model: 'Users', key: 'id' }
    },
    task: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'user_tasks',
      underscored: true,
    });

    UserTasks.associate = (models) => {
      UserTasks.belongsTo(models.Users,{ 
        as: 'user',
        foreignKey: 'user_id',
      })
    }

  return UserTasks;
};