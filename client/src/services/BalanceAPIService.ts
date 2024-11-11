import axiosInstance from "../utils/axiosInstance";

export const fetchUserBalance = async () => {
  const { data } = await axiosInstance.get(`/balance`);
  return data;
};

export const addUserBalance = async (addedAmount: number) => {
  const { data } = await axiosInstance.post(`/balance`, { addedAmount });
  return data;
};

export const fetchPaymentLogs = async (
  offset: number,
  limit: number
) => {
  const { data } = await axiosInstance.get(`/balance/payment-log`, {
    params: { offset, limit },
  });
  return data;
};
