import axiosInstance from "../utils/axiosInstance";

export const addCoinToWatchlist = async (assetId: string, assetName : string) => {
  const { data } = await axiosInstance.post("/watchlist/add", { assetId, assetName });
  return data;
};

export const removeCoinFromWatchlist = async (assetId: string) => {
  const { data } = await axiosInstance.post("/watchlist/remove", { assetId });
  return data;
};

export const getUserWatchlist = async () => {
  const { data } = await axiosInstance.get("/watchlist");
  return data;
};
