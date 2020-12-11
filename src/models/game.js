module.exports = (sequelize, type) => {
  const game = sequelize.define('game', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    week: type.INTEGER,
    homeTeam: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'team',
        key: 'id',
      }
    },
    visitingTeam: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'team',
        key: 'id',
      }
    },
    date: type.DATE,
    displayName: type.STRING,
    venue: type.STRING,
    homeScore: type.INTEGER,
    visitorScore: type.INTEGER,
    status: type.INTEGER,
    line: type.FLOAT,
  });
  return game;
};
