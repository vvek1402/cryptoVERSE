import express from "express";
import { addCoin, getOrders, getUserHoldings, removeCoin } from "../controllers/HoldingsController";
import Authenticate from "../middleware/AuthMiddleware";

const holdingsRoute = express.Router();

holdingsRoute.post("/add-coin", Authenticate, addCoin);

holdingsRoute.post("/remove-coin", Authenticate, removeCoin);

holdingsRoute.get("/", Authenticate, getUserHoldings);

holdingsRoute.get("/orders", Authenticate, getOrders);

export default holdingsRoute;
