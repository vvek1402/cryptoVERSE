import express from 'express';
import wishrouter from './WatchlistRoutes';
import authrouter from './AuthRoutes';

const router = express.Router();

router.use('/watchlist', wishrouter);

router.use('/auth', authrouter);

export default router;