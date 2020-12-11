/* eslint-disable radix */
import db from '../sequelize';

export const placeBet = async (req, res) => {
  const game = await db.Game.findOne({
    where: { id: req.body.game }
  });
  if (game.homeTeam === parseInt(req.body.team) && game.visitingTeam === parseInt(req.body.team)) {
    res.status(422).send(`Team ${parseInt(req.body.team)} is not playing the referenced ${game.displayName} - ${game.homeTeam} vs ${game.visitingTeam}`);
  }
  try {
    const newBet = await db.Bet.create({
      game: parseInt(req.body.game),
      team: parseInt(req.body.team),
      amount: parseInt(req.body.amount),
      user: parseInt(req.body.user),
    });
    console.log('bet placed!');
    res.status(200).send({ message: 'Bet Placed', newBet });
  } catch (err) {
    console.error('error placing bet: ', err);
    res.status(401).send('error placing bet');
  }
};

export const getUserBets = async (req, res) => {
  console.log(req.params);
  const bets = await db.Bet.findAll({
    where: {
      user: req.params.userId,
    }
  })
    .catch(err => {
      console.log(err);
      res.status(401).send('error retrieving bets.');
    });
  res.status(200).send(bets);
};

export const setLine = async (req, res) => {
  if (req.body.gameId === null || req.body.newLine === null) {
    res.status(400).send('please try again');
  }
  try {
    const update = await db.Game.update({
      line: req.body.newLine,
    }, {
      where: { id: req.body.gameId },
      returning: true,
      plain: true,
    },);
    const game = await db.Game.findOne({
      where: { id: req.body.gameId },
      returning: true,
      plain: true,
    },);
    res.status(200).send(game);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
