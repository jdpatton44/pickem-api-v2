module.exports = (sequelize, type) => {
  const team = sequelize.define('team', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
    },
    displayName: type.STRING,
    location: type.STRING,
    slug: type.STRING,
    shortDisplayName: type.STRING,
    color: type.STRING,
    alternateColor: type.STRING,
    logo: type.STRING,
    link: type.STRING,
  });
  return team;
};
