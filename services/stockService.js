import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

const limit = pLimit(5); // avoid rate limit

// Example stock universe (expand this)
const STOCKS = [
  "RELIANCE.NS",
  "TCS.NS",
  "INFY.NS",
  "HDFCBANK.NS",
  "ICICIBANK.NS",
  "SBIN.NS",
  "LT.NS",
  "ITC.NS",
  "WIPRO.NS",
  "AXISBANK.NS"
];

async function fetchStockGain(symbol, start, end) {
  try {
    const result = await yahooFinance.historical(symbol, {
      period1: start,
      period2: end,
    });

    if (!result || result.length < 2) return null;

    const first = result[0].close;
    const last = result[result.length - 1].close;

    const gain = ((last - first) / first) * 100;

    return {
      symbol,
      startPrice: first,
      endPrice: last,
      gain: Number(gain.toFixed(2)),
    };
  } catch (err) {
    return null;
  }
}

export async function getTopGainers(start, end) {
  const promises = STOCKS.map((symbol) =>
    limit(() => fetchStockGain(symbol, start, end))
  );

  const results = await Promise.all(promises);

  return results
    .filter(Boolean)
    .sort((a, b) => b.gain - a.gain)
    .slice(0, 20);
}