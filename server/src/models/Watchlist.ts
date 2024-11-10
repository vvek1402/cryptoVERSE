import mongoose, { Schema, Document } from "mongoose";
import { WatchlistDocument } from "src/utils/interfaces";

const watchlistSchema = new Schema<WatchlistDocument>({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      assetId: { type: String, required: true },
      assetName: { type: String, required: true },
    },
  ],
});

export default mongoose.model<WatchlistDocument>("Watchlist", watchlistSchema);
