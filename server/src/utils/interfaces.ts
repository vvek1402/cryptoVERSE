import { Request } from "express";
import { Schema } from "mongoose";

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  userId?: string;
  createdAt?: {
    type: Date;
    default: Date;
  };
}

export interface CustomRequest extends Request {
  userid?: string;
}

export interface WatchlistItem {
  coinId: string;
  coinName: string;
}

export interface WatchlistDocument extends Document {
  userId: string;
  items: WatchlistItem[];
}

export interface Coin {
  id: string;
  quantity: number;
  priceUsd: number;
  amountInvested : number;
  name: string;
  symbol: string;
}

export interface IHoldings extends Document {
  userId: string;
  coins: Coin[];
}

export interface IBalance extends Document {
  userId: Schema.Types.ObjectId;
  balance: number;
  updatedAt: Date;
}

export interface IOrder extends Document {
  userId: string;
  coinId: string;
  coinName: string;
  quantity: number;
  price: number;
  orderType: "buy" | "sell";
  totalPrice: number;
  date: Date;
}

export interface IPaymentLog extends Document {
  userId: Schema.Types.ObjectId;
  addedAmount: number;
  createdAt: Date;
}
