import Price from "../models/Price.js";

export async function computeGainers(start, end) {
  const pipeline = [
    {
      $match: {
        date: { $gte: new Date(start), $lte: new Date(end) }
      }
    },
    {
      $sort: { date: 1 }
    },
    {
      $group: {
        _id: "$symbol",
        startPrice: { $first: "$open" },
        endPrice: { $last: "$close" },
        startDate: { $first: "$date" },
        endDate: { $last: "$date" },
        rangeStart: { $first: "$rangeStart" },
        rangeEnd: { $first: "$rangeEnd" }
      }
    },
    {
      $match: {
        startPrice: { $ne: 0 } // Avoid division by zero
      }
    },
    {
      $project: {
        symbol: "$_id",
        startDate: "$startDate",
        endDate: "$endDate",
        rangeStart: "$rangeStart",
        rangeEnd: "$rangeEnd",
        startPrice: "$startPrice",
        endPrice: "$endPrice",
        gain: {
          $multiply: [
            { $divide: [{ $subtract: ["$endPrice", "$startPrice"] }, "$startPrice"] },
            100
          ]
        }
      }
    },
    { $sort: { gain: -1 } },
    { $limit: 20 }
  ];

  return await Price.aggregate(pipeline);
}