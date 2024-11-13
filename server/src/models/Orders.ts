import mongoose, { Schema, Document } from "mongoose";

// Define the Order schema
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

interface IOrder extends Document {
  userId: string;
  coinId: string;
  coinName: string;
  quantity: number;
  price: number;
  orderType: "buy" | "sell";
  totalPrice: number;
  date: Date;
}

export const Orders = mongoose.model<IOrder>("Order", orderSchema);