import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
});

export default mongoose.model("Stock", stockSchema);