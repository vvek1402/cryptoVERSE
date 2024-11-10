import create from "zustand";

type BalanceStore = {
  balance: number;
  addBalance: (amount: number) => void;
  withdrawBalance: (amount: number) => void;
  fetchBalance: () => void;
};

export const useBalanceStore = create<BalanceStore>((set) => ({
  balance: 0,

  fetchBalance: () => {
    set({ balance: 0 });
  },

  addBalance: (amount) => set((state) => ({ balance: state.balance + amount })),

  withdrawBalance: (amount) =>
    set((state) => {
      const newBalance = state.balance - amount;
      return { balance: newBalance < 0 ? 0 : newBalance }; 
    }),
}));
