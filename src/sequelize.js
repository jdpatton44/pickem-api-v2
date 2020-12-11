import Sequelize from 'sequelize';
import {
  database, dbUser, dbPass, dbHost
} from './settings';

const sequelize = new Sequelize(database, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql',
  logging: true,
  define: {
    timestamps: true,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Message = require('./models/message')(sequelize, Sequelize);
db.Game = require('./models/game')(sequelize, Sequelize);
db.User = require('./models/user')(sequelize, Sequelize);
db.Team = require('./models/team')(sequelize, Sequelize);
db.Bet = require('./models/bet')(sequelize, Sequelize);

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  // console.log('Tables have been created');
});

module.exports = db;
