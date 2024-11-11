import { Response } from "express";
import {
  addCoinToHoldings,
  removeCoinFromHoldings,
  getHoldings,
  createOrder,
  getOrdersLogsQuery,
} from "../services/HoldingsService";
import { updateBalanceQuery } from "../services/BalanceService";
import { CustomRequest } from "src/utils/interfaces";

export const addCoin = async (req: CustomRequest, res: Response) => {
  const { coin, totalValue } = req.body;
  const userId = req.userid; 

  try {
    const balance = await updateBalanceQuery(userId, totalValue, true);

    const holdings = await addCoinToHoldings(userId, coin);

    await createOrder(userId, "buy", -Math.abs(totalValue), coin);
    res.json({ balance, holdings });
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const removeCoin = async (req: CustomRequest, res: Response) => {
  const { coinId, quantity, totalValue } = req.body;
  console.log(req.body)
  const userId = req.userid; 

  try {
    const holdings = await removeCoinFromHoldings(userId, coinId, quantity);

    const coin : any = holdings.coins.find((c) => c.id === coinId);

    await updateBalanceQuery(userId, totalValue, true);
    await createOrder(userId, "sell", Math.abs(totalValue), coin);

    res.json({ holdings });
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const getUserHoldings = async (req: CustomRequest, res: Response) => {
  const userId = req.userid; 

  try {
    const holdings = await getHoldings(userId);
    res.json(holdings);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const getOrders = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userid; 
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const logs = await getOrdersLogsQuery(userId, offset, limit);
    res.json(logs);
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};