import create from "zustand";
import { HoldingsState } from "../utils/interfaces";

const loadStateFromLocalStorage = () => {
  const storedData = localStorage.getItem("holdings-storage");
  return storedData ? JSON.parse(storedData) : { coins: [], totalQuantity: 0 };
};

export const useHoldingsStore = create<HoldingsState>((set) => ({
  ...loadStateFromLocalStorage(),
  addCoin: (coin) =>
    set((state) => {
      const existingCoin = state.coins.find((c) => c.id === coin.id);
      const updatedCoins = existingCoin
        ? state.coins.map((c : any) =>
            c.id === coin.id ? { ...c, amount: c.amount + coin.amount } : c
          )
        : [...state.coins, coin];

      const totalQuantity = updatedCoins.reduce(
        (acc, coin) => acc + coin.amount,
        0
      );

      localStorage.setItem("holdings-storage", JSON.stringify({
        coins: updatedCoins,
        totalQuantity,
      }));

      return {
        coins: updatedCoins,
        totalQuantity,
      };
    }),
  removeCoin: (id, quantity) =>
    set((state) => {
      const updatedCoins = state.coins
        .map((coin : any) =>
          coin.id === id ? { ...coin, amount: coin.amount - quantity } : coin
        )
        .filter((coin) => coin.amount > 0);

      const totalQuantity = updatedCoins.reduce(
        (acc, coin) => acc + coin.amount,
        0
      );

      localStorage.setItem("holdings-storage", JSON.stringify({
        coins: updatedCoins,
        totalQuantity,
      }));

      return {
        coins: updatedCoins,
        totalQuantity,
      };
    }),
}));
