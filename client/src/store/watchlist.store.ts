import create from "zustand";
import {
  getUserWatchlist,
  addCoinToWatchlist,
  removeCoinFromWatchlist,
} from "../services/WatchlistAPIService";
import { WatchlistStore } from "../utils/interfaces";

const useWatchlistStore = create<WatchlistStore>((set, get) => {
  const store = {
    watchlist: [],
    fetchWatchlist: async () => {
      try {
        const data = await getUserWatchlist();
        set({ watchlist: data.items });
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    },
    addCoin: async (coinId: string, coinName: string) => {
      try {
        const newCoin = await addCoinToWatchlist(coinId, coinName);
        set({ watchlist: newCoin.items });
      } catch (error) {
        console.error("Error adding coin to watchlist:", error);
      }
    },
    removeCoin: async (coinId: string) => {
      try {
        await removeCoinFromWatchlist(coinId);
        set((state) => ({
          watchlist: state.watchlist.filter((coin) => coin.coinId !== coinId),
        }));
      } catch (error) {
        console.error("Error removing coin from watchlist:", error);
      }
    },
    isInWatchlist: (coinId: string): boolean => {
      const state = get();
      return state.watchlist.some((coin) => coin.coinId === coinId);
    },
  };
  store.fetchWatchlist();
  return store;
});

export default useWatchlistStore;
