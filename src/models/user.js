module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'student'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        isEmail: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {}
  );
  User.associate = (models) => {
    // User.hasMany(models.Schedule, {
    //   as: 'lecturers',
    //   foreignKey: 'lectuererId'
    // });
    // User.hasMany(models.Schedule, {
    //   as: 'students',
    //   foreignKey: 'studentId'
    // });
  };
  return User;
};
