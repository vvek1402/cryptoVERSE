import create from "zustand";
import { CryptoSelected, HoldingsState } from "../utils/interfaces";
import {
  addCoinToHoldings,
  getUserHoldings,
  removeCoinFromHoldings,
} from "../services/HoldingsAPIService";

export const useHoldingsStore = create<HoldingsState>((set) => {
  const store = {
    coins: [],
    totalQuantity: 0,

    fetchUserHoldings: async () => {
      try {
        const holdings = await getUserHoldings();
        const totalQuantity = holdings.coins.reduce(
          (acc: number, coin: CryptoSelected) => acc + (coin.quantity ?? 0),
          0
        );

        set({
          coins: holdings.coins,
          totalQuantity,
        });
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    },

    addCoin: async (coin: CryptoSelected, totalValue: number) => {
      try {
        const response = await addCoinToHoldings(coin, -totalValue);
        const updatedCoins = response.holdings.coins;

        const totalQuantity = updatedCoins.reduce(
          (acc: number, coin: CryptoSelected) => acc + (coin.quantity ?? 0),
          0
        );

        set({
          coins: updatedCoins,
          totalQuantity,
        });
      } catch (error) {
        console.error("Error adding coin:", error);
      }
    },

    removeCoin: async (coin: CryptoSelected, quantity: number, totalValue: number) => {
      try {
        const response = await removeCoinFromHoldings(coin, quantity, totalValue);
        const updatedCoins = response.holdings.coins;

        const totalQuantity = updatedCoins.reduce(
          (acc: number, coin: CryptoSelected) => acc + (coin.quantity ?? 0),
          0
        );

        set({
          coins: updatedCoins,
          totalQuantity,
        });
      } catch (error) {
        console.error("Error removing coin:", error);
      }
    },
  };

  store.fetchUserHoldings();
  return store;
});
