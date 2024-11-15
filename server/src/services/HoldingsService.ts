import { Holdings } from "../models/Holdings";
import { Orders } from "../models/Orders";

export const addCoinToHoldings = async (
  userId: string | undefined,
  coin: { id: string; quantity: number; priceUsd: number; name: string; symbol: string; amountInvested : number }
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
    existingCoin.quantity += coin.quantity;
  } else {
    holdings.coins.push(coin);
  }

  await holdings.save();
  return holdings;
};

export const removeCoinFromHoldings = async (
  userId: string | undefined,
  coinId: string,
  quantity: number
) => {
  const holdings = await Holdings.findOne({ userId });

  if (!holdings) {
    throw new Error("No holdings found");
  }

  const coin = holdings.coins.find((c) => c.id === coinId);
  if (!coin || coin.quantity < quantity) {
    throw new Error("Not enough coins to remove");
  }

  coin.quantity -= quantity;

  if (coin.quantity === 0) {
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
  coin: { id: string; quantity: number; priceUsd: number; name: string; symbol: string },
  quantity : number
) => {
  const newOrder = new Orders({
    userId,
    coinId: coin.id,
    coinName: coin.name,
    quantity: quantity,
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

