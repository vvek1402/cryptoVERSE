import express from 'express';
import wishrouter from './WatchlistRoutes';
import authrouter from './AuthRoutes';
import balancerouter from './BalanceRoutes';
import holdingsRoute from './HoldingsRoutes';

const router = express.Router();

router.use('/watchlist', wishrouter);

router.use('/auth', authrouter);

router.use('/balance', balancerouter);

router.use('/holdings', holdingsRoute);

export default router;