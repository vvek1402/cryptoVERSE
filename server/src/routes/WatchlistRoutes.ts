import express from "express";
import { addWatchlistItem, getUserWatchlist, removeWatchlistItem } from "../controllers/WatchlistController";
import Authenticate from "../middleware/AuthMiddleware";

const wishrouter = express.Router();

wishrouter.route("/add").post(Authenticate, addWatchlistItem);
wishrouter.route("/remove").post(Authenticate, removeWatchlistItem);
wishrouter.route("/").get(Authenticate, getUserWatchlist);

export default wishrouter;
