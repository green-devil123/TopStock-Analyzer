import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  symbol: String,
  date: Date,
  open: Number,
  close: Number,
  rangeStart: Date,
  rangeEnd: Date,
});

priceSchema.index({ symbol: 1, date: 1 }, { unique: true });

export default mongoose.model("Price", priceSchema);