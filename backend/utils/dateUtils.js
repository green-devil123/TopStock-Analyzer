import dayjs from "dayjs";

export function generateDateRanges(startYear = 2021, endYear = dayjs().year()) {
  const ranges = [
    {
      start: `2022-01-01`,
      end: `2023-01-01`,
    },
    {
      start: `2022-02-01`,
      end: `2023-02-01`,
    },
    {
      start: `2022-03-01`,
      end: `2023-03-01`,
    },
    {
      start: `2022-04-01`,
      end: `2023-04-01`,
    },
    {
      start: `2022-05-01`,
      end: `2023-05-01`,
    },
    {
      start: `2022-06-01`,
      end: `2023-06-01`,
    },
  ];

//   let current = dayjs(`${startYear}-01-21`);

//   const today = dayjs();

//   while (current.isBefore(today) && current.year() <= endYear) {
//     const start = current;
//     const end = current.add(1, "year");

//     if (end.isAfter(today)) {
//       ranges.push({
//         start: start.format("YYYY-MM-DD"),
//         end: today.format("YYYY-MM-DD"),
//       });
//     } else {
//       ranges.push({
//         start: start.format("YYYY-MM-DD"),
//         end: end.format("YYYY-MM-DD"),
//       });
//     }

//     current = current.add(1, "day");
//   }

  return ranges;
}