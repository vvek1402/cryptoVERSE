// services/balanceService.ts
import { Balance } from "../models/Balance";
import { PaymentLog } from "../models/PaymentLog";

export const getBalanceQuery = async (userId: string | undefined) => {
  return (await Balance.findOne({ userId })) || { balance: 0 };
};

export const updateBalanceQuery = async (
  userId: string | undefined,
  addedAmount: number,
  notlog? : boolean
) => {
  const balance = await Balance.findOneAndUpdate(
    { userId },
    { $inc: { balance: addedAmount }, updatedAt: new Date() },
    { new: true, upsert: true }
  );

  if (!notlog) {
    await PaymentLog.create({ userId, addedAmount });
  }
  return balance;
};

export const getPaymentLogsQuery = async (
  userId: string | undefined,
  offset: number,
  limit: number
) => {
  return await PaymentLog.find({ userId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
};
