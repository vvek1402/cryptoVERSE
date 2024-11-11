import mongoose, { Schema, Document } from "mongoose";
import { WatchlistDocument } from "../utils/interfaces";

const watchlistSchema = new Schema<WatchlistDocument>({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      coinId: { type: String, required: true },
      coinName: { type: String, required: true },
    },
  ],
});

export default mongoose.model<WatchlistDocument>("Watchlist", watchlistSchema);
