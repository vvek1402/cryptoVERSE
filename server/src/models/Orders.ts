import mongoose, { Schema, Document } from "mongoose";

// Define the Order schema
const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    coinId: { type: String, required: true },
    coinName: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    orderType: { type: String, enum: ["buy", "sell"], required: true }, // Buy or Sell
    totalPrice: { type: Number, required: true }, // total price for the transaction (amount * price)
    date: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` timestamps
);

interface IOrder extends Document {
  userId: string;
  coinId: string;
  coinName: string;
  amount: number;
  price: number;
  orderType: "buy" | "sell";
  totalPrice: number;
  date: Date;
}

export const Orders = mongoose.model<IOrder>("Order", orderSchema);