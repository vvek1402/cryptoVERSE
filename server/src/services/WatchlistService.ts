import Watchlist from "../models/Watchlist";

export const addToWatchlist = async (userId: string | undefined, coinId: string, coinName: string) => {
  let watchlist = await Watchlist.findOne({ userId });
  if (!watchlist) {
    watchlist = new Watchlist({ userId, items: [{ coinId, coinName }] });
  } else {
    if (!watchlist.items.some((item) => item.coinId === coinId)) {
      watchlist.items.push({ coinId, coinName });
    }
  }
  return watchlist.save();
};

export const removeFromWatchlist = async (userId: string | undefined, coinId: string) => {
  const watchlist = await Watchlist.findOne({ userId });
  if (!watchlist) throw new Error("Watchlist not found");

  watchlist.items = watchlist.items.filter((item) => item.coinId !== coinId);
  return watchlist.save();
};

export const getWatchlistByUser = async (userId: string | undefined) => {
  return Watchlist.findOne({ userId });
};
