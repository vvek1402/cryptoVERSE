import { create } from "zustand";
import { AuthState } from "../utils/interfaces";

const getInitialAuthState = (): boolean => {
  const storedAuthState = localStorage.getItem("isAuthenticated");
  return storedAuthState === "true";
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: getInitialAuthState(),
  login: (email, password) => {
    set({ isAuthenticated: true });
    localStorage.setItem("isAuthenticated", "true");
  },
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.setItem("isAuthenticated", "false");
  },
}));
