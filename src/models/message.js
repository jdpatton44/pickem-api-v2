module.exports = (sequelize, type) => {
  const message = sequelize.define('message', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    message: {
      type: type.STRING,
      allowNull: false,
    },
  }, {});
  return message;
};
