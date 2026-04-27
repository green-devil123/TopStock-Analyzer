import pLimit from "p-limit";
import { generateDateRanges } from "../utils/dateUtils.js";
import { fetchAndSavePrices } from "./fetcher.js";

const STOCKS = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
  "VBL.NS",
  "RELIANCE.NS",
  "TCS.NS",
  "INFY.NS"
];

const limit = pLimit(5);

export async function runBatch() {
  const ranges = generateDateRanges(2021, 2025);

  for (const range of ranges) {
    console.log(`Fetching for ${range.start} to ${range.end}`);

    const promises = STOCKS.map((symbol) =>
      limit(() => fetchAndSavePrices(symbol, range.start, range.end))
    );

    await Promise.all(promises);
  }

  console.log("Batch fetch completed");
}