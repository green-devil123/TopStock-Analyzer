import express from "express";
import mongoose from "mongoose";
import { generateDateRanges } from "./utils/dateUtils.js";
import { computeGainers } from "./services/gainers.js";
import { runBatch } from "./services/batchRunner.js";
import Price from "./models/Price.js";
import Stock from "./models/Stock.js";

mongoose.connect("mongodb://localhost:27017/yfinance");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.get("/api/gainers", async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: "start and end dates required" });
    }
    const gainers = await computeGainers(start, end);
    res.json(gainers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch gainers" });
  }
});

app.get("/api/prices/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const { start, end } = req.query;
    const query = { symbol };
    if (start && end) {
      query.date = { $gte: new Date(start), $lte: new Date(end) };
    }
    const prices = await Price.find(query).sort({ date: 1 });
    res.json(prices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
});

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