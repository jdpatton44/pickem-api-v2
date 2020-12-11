module.exports = (sequelize, type) => {
  const user = sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: type.STRING,
    last_name: type.STRING,
    email: {
      type: type.STRING,
      allowNull: false,
    },
    username: {
      type: type.STRING,
      allowNull: false,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    points: {
      type: type.INTEGER,
      allowNull: false,

    },
    resetPasswordToken: type.STRING,
    resetPasswordExpires: type.DATE,
  }, {});
  return user;
};
