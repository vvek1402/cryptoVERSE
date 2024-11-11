import axiosInstance from "../utils/axiosInstance";

export const addCoinToWatchlist = async (coinId: string, coinName : string) => {
  const { data } = await axiosInstance.post("/watchlist/add", { coinId, coinName });
  return data;
};

export const removeCoinFromWatchlist = async (coinId: string) => {
  const { data } = await axiosInstance.post("/watchlist/remove", { coinId });
  return data;
};

export const getUserWatchlist = async () => {
  const { data } = await axiosInstance.get("/watchlist");
  return data;
};
