import { Response } from "express";
import { addToWatchlist, removeFromWatchlist, getWatchlistByUser } from "../services/WatchlistService";
import { handleErrorResponse } from "../utils/helpers";
import { CustomRequest } from "../utils/interfaces";

export const addWatchlistItem = async (req: CustomRequest, res: Response) => {
  try {
    const { coinId, coinName } = req.body;
    const userId = req.userid; 

    const watchlist = await addToWatchlist(userId, coinId, coinName);
    res.status(200).json(watchlist);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const removeWatchlistItem = async (req: CustomRequest, res: Response) => {
  try {
    const { coinId } = req.body;
    const userId = req.userid;

    const watchlist = await removeFromWatchlist(userId, coinId);
    res.status(200).json(watchlist);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const getUserWatchlist = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userid;

    const watchlist = await getWatchlistByUser(userId);
    if (!watchlist) return handleErrorResponse(res, 404, "Watchlist not found");

    res.status(200).json(watchlist);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};
