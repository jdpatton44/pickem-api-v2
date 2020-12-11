module.exports = (sequelize, type) => {
  const bet = sequelize.define('bet', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    game: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'id',
      },
    },
    team: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'team',
        key: 'id',
      },
    },
    amount: {
      type: type.INTEGER,
      allowNull: false,
    },
    user: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
      outcome: {
        type: type.STRING,

      }
    },
  }, {});
  return bet;
};
