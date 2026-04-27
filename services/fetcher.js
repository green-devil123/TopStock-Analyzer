import YahooFinance from "yahoo-finance2";
import Price from "../models/Price.js";

const yahooFinance = new YahooFinance();

export async function fetchAndSavePrices(symbol, start, end) {
  try {
    const result = await yahooFinance.historical(symbol, {
      period1: start,
      period2: end,
    });

    if (!result || result.length === 0) return;
    const resultArr = [result[0], result[result.length - 1]];
    const prices = resultArr.map((data) => ({
      symbol,
      date: data.date,
      open: data.open,
      close: data.close,
      rangeStart: new Date(start),
      rangeEnd: new Date(end),
    }));
    // Use insertMany with ordered: false to skip duplicates
    await Price.insertMany(prices, { ordered: false });
  } catch (err) {
    console.error(`Error fetching ${symbol}:`, err.message);
  }
}