import create from "zustand";
import {
  addUserBalance,
  fetchUserBalance,
} from "../services/BalanceAPIService";
import { BalanceStore } from "../utils/interfaces";

export const useBalanceStore = create<BalanceStore>((set) => {
  const store = {
    balance: 0,

    fetchBalance: async () => {
      try {
        const { balance } = await fetchUserBalance();
        set({ balance });
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    },

    addBalance: async (amount: number) => {
      try {
        const { balance } = await addUserBalance(amount);
        set({ balance });
      } catch (error) {
        console.error("Error adding balance:", error);
      }
    },

    withdrawBalance: async (amount: number) => {
      try {
        const { balance } = await addUserBalance(-amount);
        set({ balance });
      } catch (error) {
        console.error("Error withdrawing balance:", error);
      }
    },
  };
  store.fetchBalance();
  return store;
});
