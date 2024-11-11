import { Schema, model, Document } from "mongoose";

interface IPaymentLog extends Document {
  userId: Schema.Types.ObjectId;
  addedAmount: number;
  createdAt: Date;
}

const paymentLogSchema = new Schema<IPaymentLog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  addedAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const PaymentLog = model<IPaymentLog>("PaymentLog", paymentLogSchema);
