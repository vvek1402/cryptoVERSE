import create from "zustand";
import {
  getUserWatchlist,
  addCoinToWatchlist,
  removeCoinFromWatchlist,
} from "../services/WatchlistService";

interface WatchlistStore {
  watchlist: { assetId: string; assetName: string }[];
  fetchWatchlist: () => Promise<void>;
  addCoin: (assetId: string, assetName: string) => Promise<void>;
  removeCoin: (coinId: string) => Promise<void>;
  isInWatchlist: (cryptoId: string) => boolean;
}

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
    addCoin: async (assetId: string, assetName: string) => {
      try {
        const newCoin = await addCoinToWatchlist(assetId, assetName);
        set({ watchlist: newCoin.items });
      } catch (error) {
        console.error("Error adding coin to watchlist:", error);
      }
    },
    removeCoin: async (coinId: string) => {
      try {
        await removeCoinFromWatchlist(coinId);
        set((state) => ({
          watchlist: state.watchlist.filter((coin) => coin.assetId !== coinId),
        }));
      } catch (error) {
        console.error("Error removing coin from watchlist:", error);
      }
    },
    isInWatchlist: (assetId: string): any => {
      const state = get();
      return state.watchlist.some((coin) => coin.assetId === assetId);
    },
  };
  store.fetchWatchlist();
  return store;
});

export default useWatchlistStore;
