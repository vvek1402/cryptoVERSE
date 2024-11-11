import { Holdings } from "../models/Holdings";
import { Orders } from "../models/Orders";

export const addCoinToHoldings = async (
  userId: string | undefined,
  coin: { id: string; amount: number; priceUsd: number; name: string; symbol: string }
) => {
  const holdings = await Holdings.findOne({ userId });

  if (!holdings) {
    const newHoldings = new Holdings({
      userId,
      coins: [coin],
    });
    await newHoldings.save();
    return newHoldings;
  }

  const existingCoin = holdings.coins.find((c) => c.id === coin.id);

  if (existingCoin) {
    existingCoin.amount += coin.amount;
  } else {
    holdings.coins.push(coin);
  }

  await holdings.save();
  return holdings;
};

export const removeCoinFromHoldings = async (
  userId: string | undefined,
  coinId: string,
  amount: number
) => {
  const holdings = await Holdings.findOne({ userId });

  if (!holdings) {
    throw new Error("No holdings found");
  }

  const coin = holdings.coins.find((c) => c.id === coinId);
  if (!coin || coin.amount < amount) {
    throw new Error("Not enough coins to remove");
  }

  coin.amount -= amount;

  if (coin.amount === 0) {
    holdings.coins = holdings.coins.filter((c) => c.id !== coinId);
  }

  await holdings.save();
  return holdings;
};

export const getHoldings = async (userId: string | undefined) => {
  const holdings = await Holdings.findOne({ userId });
  return holdings;
};

export const createOrder = async (
  userId: string | undefined, 
  orderType: string, 
  totalPrice: number, 
  coin: { id: string; amount: number; priceUsd: number; name: string; symbol: string }
) => {
  const newOrder = new Orders({
    userId,
    coinId: coin.id,
    coinName: coin.name,
    amount: coin.amount,
    price: coin.priceUsd,
    orderType,
    totalPrice,
  });
  
  await newOrder.save();
  return newOrder;
};

export const getOrdersLogsQuery = async (
  userId: string | undefined,
  offset: number,
  limit: number
) => {
  return await Orders.find({ userId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
};

