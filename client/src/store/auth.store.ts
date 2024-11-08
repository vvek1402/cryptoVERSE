import { create } from "zustand";
import { jwtDecode } from "jwt-decode"; 
import { AuthState } from "../utils/interfaces";

interface TokenPayload {
  exp: number;
}

const getInitialAuthState = (): boolean => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: TokenPayload = jwtDecode(token);

    const isTokenExpired = decoded.exp * 1000 < Date.now();
    return !isTokenExpired;
  }
  return false;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: getInitialAuthState(),
  doLogin: () => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false });
  },
}));
