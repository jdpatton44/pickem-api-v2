import axios from 'axios';
import db from '../sequelize';

export const updateScores = async (req, res, next) => {
  const espnEvents = await axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
    .catch(err => {
      console.log(err.message);
      res.send('Request failed.');
    });
  if (!espnEvents) {
    res.status(400).send('Please try again later.');
  }
  const weekNum = espnEvents.data.week.number;
  const events = espnEvents.data.events.map(event => event);
  const startedEvents = events.filter(event => event.competitions[0].status.type.id === '1');
  const updates = startedEvents.map(event => {
    const update = {
      id: event.competitions[0].id,
      homeScore: event.competitions[0].competitors[0].homeAway === 'home' ? event.competitions[0].competitors[0].score : event.competitions[0].competitors[1].score,
      visitorScore: event.competitions[0].competitors[0].homeAway === 'home' ? event.competitions[0].competitors[0].score : event.competitions[0].competitors[1].score,
      status: event.competitions[0].status.type.id,
    };
    return update;
  });
  try {
    const dbUpdates = updates.map(async update => {
      const dbUpdate = await db.Game.update({
        homeScore: update.homeScore,
        visitorScore: update.visitorScore,
        status: parseInt(update.status)
      }, {
        where: { id: parseInt(update.id) },
        returning: true,
        plain: true,
      });
      const updatedGame = await db.Game.findOne({
        where: { id: parseInt(update.id) }
      });
      console.log(updatedGame);
      return updatedGame;
    });
    res.status(200).send(dbUpdates);
  } catch (err) {
    res.status(400).send(err);
  }
};
