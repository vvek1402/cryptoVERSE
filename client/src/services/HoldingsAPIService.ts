import axiosInstance from "../utils/axiosInstance";

export const addCoinToHoldings = async (coin: any, totalValue : number) => {
  const response = await axiosInstance.post(`/holdings/add-coin`, {
    coin,
    totalValue
  });
  return response.data;
};

export const removeCoinFromHoldings = async (
  coinId: string,
  quantity: number,
  totalValue : number,
) => {
  const response = await axiosInstance.post(`/holdings/remove-coin`, {
    coinId,
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
