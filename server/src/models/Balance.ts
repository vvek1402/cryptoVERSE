import { Schema, model } from "mongoose";
import { IBalance } from "../utils/interfaces";

const balanceSchema = new Schema<IBalance>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Balance = model<IBalance>("Balance", balanceSchema);
