import express from 'express';
import { testEnvironmentVariable } from '../settings';
import { addMessage, messagesPage } from '../controllers/messages';
import { loadGames, updateScores } from '../controllers/games';
import { getUserBets, placeBet, setLine } from '../controllers/bets';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.status(200).json({ message: testEnvironmentVariable }));

// Message Routes
indexRouter.post('/messages', addMessage);
indexRouter.get('/messages', messagesPage);

// Bet Routes
indexRouter.get('/getUserBets/:userId', getUserBets);
indexRouter.post('/placeBet', placeBet);
indexRouter.post('/setLine', setLine);

// Games
indexRouter.get('/updateScores', updateScores);
indexRouter.get('/loadGames', loadGames);

export default indexRouter;
