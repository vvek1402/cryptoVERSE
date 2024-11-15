import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "src/utils/interfaces";

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    coinId: { type: String, required: true },
    coinName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    orderType: { type: String, enum: ["buy", "sell"], required: true }, 
    totalPrice: { type: Number, required: true }, 
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Orders = mongoose.model<IOrder>("Order", orderSchema);