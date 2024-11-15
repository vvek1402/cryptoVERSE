import { Schema, model, Document } from "mongoose";
import { Coin, IHoldings } from "../utils/interfaces";

const coinSchema = new Schema<Coin>({
  id: { type: String, required: true },
  quantity: { type: Number, required: true },
  priceUsd: { type: Number, required: true },
  amountInvested: { type: Number, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
});

const holdingsSchema = new Schema<IHoldings>({
  userId: { type: String, required: true },
  coins: { type: [coinSchema], default: [] },
});

export const Holdings = model<IHoldings>("Holdings", holdingsSchema);
