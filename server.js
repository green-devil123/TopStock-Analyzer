import express from "express";
import mongoose from "mongoose";
import { generateDateRanges } from "./utils/dateUtils.js";
import { computeGainers } from "./services/gainers.js";
import { runBatch } from "./services/batchRunner.js";

mongoose.connect("mongodb://localhost:27017/yfinance");

const app = express();
const PORT = 8000;

app.get("/run-batch", async (req, res) => {
  try {
    await runBatch();
    res.json({ success: true, message: "Batch completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Batch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});