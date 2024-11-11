import { Request } from "express";

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
