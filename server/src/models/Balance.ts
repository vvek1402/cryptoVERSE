import { Schema, model, Document } from "mongoose";

interface IBalance extends Document {
  userId: Schema.Types.ObjectId;
  balance: number;
  updatedAt: Date;
}

const balanceSchema = new Schema<IBalance>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Balance = model<IBalance>("Balance", balanceSchema);
