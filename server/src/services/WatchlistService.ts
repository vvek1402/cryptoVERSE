import Watchlist from "../models/Watchlist";

export const addToWatchlist = async (userId: string | undefined, assetId: string, assetName: string) => {
  let watchlist = await Watchlist.findOne({ userId });
  if (!watchlist) {
    watchlist = new Watchlist({ userId, items: [{ assetId, assetName }] });
  } else {
    if (!watchlist.items.some((item) => item.assetId === assetId)) {
      watchlist.items.push({ assetId, assetName });
    }
  }
  return watchlist.save();
};

export const removeFromWatchlist = async (userId: string | undefined, assetId: string) => {
  const watchlist = await Watchlist.findOne({ userId });
  if (!watchlist) throw new Error("Watchlist not found");

  watchlist.items = watchlist.items.filter((item) => item.assetId !== assetId);
  return watchlist.save();
};

export const getWatchlistByUser = async (userId: string | undefined) => {
  return Watchlist.findOne({ userId });
};
