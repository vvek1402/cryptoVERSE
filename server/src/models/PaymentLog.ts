import { Schema, model, Document } from "mongoose";
import { IPaymentLog } from "../utils/interfaces";


const paymentLogSchema = new Schema<IPaymentLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  addedAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const PaymentLog = model<IPaymentLog>("PaymentLog", paymentLogSchema);
