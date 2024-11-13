import axiosInstance from "../utils/axiosInstance";
import { CryptoSelected } from "../utils/interfaces";

export const addCoinToHoldings = async (coin: CryptoSelected, totalValue : number) => {
  const response = await axiosInstance.post(`/holdings/add-coin`, {
    coin,
    totalValue
  });
  return response.data;
};

export const removeCoinFromHoldings = async (
  coin: CryptoSelected,
  quantity: number,
  totalValue : number,
) => {
  const response = await axiosInstance.post(`/holdings/remove-coin`, {
    coin,
    quantity,
    totalValue
  });
  return response.data;
};

export const getUserHoldings = async () => {
  const response = await axiosInstance.get(`/holdings`);
  return response.data;
};

export const fetchOrdersLogs = async (
  offset: number,
  limit: number
) => {
  const { data } = await axiosInstance.get(`/holdings/orders`, {
    params: { offset, limit },
  });
  return data;
};
