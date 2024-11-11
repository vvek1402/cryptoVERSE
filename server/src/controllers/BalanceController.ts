import { Response } from "express";
import { getBalanceQuery, getPaymentLogsQuery, updateBalanceQuery } from "../services/BalanceService";
import { CustomRequest } from "../utils/interfaces";

export const getBalance = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userid; 
    const balance = await getBalanceQuery(userId);
    res.json(balance);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const updateBalance = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userid; 
    const { addedAmount } = req.body;

    const balance = await updateBalanceQuery(userId, addedAmount);
    res.json(balance);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const getPaymentLogs = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userid; 
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const logs = await getPaymentLogsQuery(userId, offset, limit);
    res.json(logs);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};
