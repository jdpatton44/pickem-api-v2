import axios from 'axios';
import db from '../sequelize';
import { updateOrCreate } from '../utils/updateOrCreate';

export const updateScores = async (req, res) => {
  const espnEvents = await axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
    .catch(err => {
      console.log(err.message);
      res.send('Request failed.');
    });
  if (!espnEvents) {
    res.status(400).send('Please try again later.');
  }
  // const weekNum = espnEvents.data.week.number;
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
      await db.Game.update({
        homeScore: update.homeScore,
        visitorScore: update.visitorScore,
        status: parseInt(update.status, 10)
      }, {
        where: { id: parseInt(update.id, 10) },
        returning: true,
        plain: true,
      });
      const updatedGame = await db.Game.findOne({
        where: { id: parseInt(update.id, 10) }
      });
      console.log(updatedGame);
      return updatedGame;
    });
    res.status(200).send(dbUpdates);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const loadGames = async (req, res) => {
  const espnEvents = await axios.get('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard')
    .catch(err => {
      console.log(err.message);
      res.send('Request failed.');
    });
  if (!espnEvents) {
    res.send('Please try again later.');
  }
  const weekNum = espnEvents.data.week.number;
  const events = espnEvents.data.events.map(event => event);
  const games = events.map(event => {
    const game = {
      id: event.id,
      week: weekNum,
      displayName: event.name,
      homeTeam: event.competitions[0].competitors[0].homeAway
        ? event.competitions[0].competitors[0].id
        : event.competitions[0].competitors[1].id,
      visitingTeam: event.competitions[0].competitors[0].homeAway
        ? event.competitions[0].competitors[1].id
        : event.competitions[0].competitors[0].id,
      date: event.competitions[0].date,
      venue: event.competitions[0].venue.fullName,
      homeScore: event.competitions[0].competitors[0].homeAway
        ? event.competitions[0].competitors[0].score
        : event.competitions[0].competitors[1].score,
      visitorScore: event.competitions[0].competitors[0].homeAway
        ? event.competitions[0].competitors[1].score
        : event.competitions[0].competitors[0].score,
      status: event.competitions[0].status.type.id,
    };
    return game;
  });
  games.map(game => updateOrCreate(db.Game, { id: game.id }, game));
  console.table(games);
  res.status(200).send(games);
};
