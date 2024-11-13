import { Schema, model, Document } from "mongoose";

interface Coin {
  id: string;
  quantity: number;
  priceUsd: number;
  name: string;
  symbol: string;
}

interface Holdings extends Document {
  userId: string;
  coins: Coin[];
}

const coinSchema = new Schema<Coin>({
  id: { type: String, required: true },
  quantity: { type: Number, required: true },
  priceUsd: { type: Number, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
});

const holdingsSchema = new Schema<Holdings>({
  userId: { type: String, required: true },
  coins: { type: [coinSchema], default: [] },
});

export const Holdings = model<Holdings>("Holdings", holdingsSchema);
