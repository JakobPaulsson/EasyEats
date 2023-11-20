const convertUnit: { [key: string]: string } = {
  cup: "ml",
  cups: "ml",
  teaspoons: "ml",
  teaspoon: "ml",
  tablespoon: "ml",
  tablespoons: "ml",
  pint: "ml",
  pints: "ml",
  "fluid ounce": "ml",
  "fluid ounces": "ml",
  quart: "ml",
  quarts: "ml",
  dash: "ml",
  dashes: "ml",
  drop: "ml",
  drops: "ml",

  pinch: "gram",
  pinches: "gram",
  ounce: "gram",
  ounces: "gram",
  pound: "gram",
  pounds: "gram",

  clove: "count",
  cloves: "count",
  slice: "count",
  slices: "count",
  count: "count",
};

const convertAmount: { [key: string]: number } = {
  cup: 240,
  cups: 240,
  teaspoons: 4.92892,
  teaspoon: 4.92892,
  tablespoon: 14.7868,
  tablespoons: 14.7868,
  pint: 473.176,
  pints: 473.176,
  "fluid ounce": 29.5735,
  "fluid ounces": 29.5735,
  quart: 946.353,
  quarts: 946.353,
  dash: 2,
  dashes: 2,
  drop: 2,
  drops: 2,

  pinch: 0,
  pinches: 0,
  ounce: 28.3495,
  ounces: 28.3495,
  pound: 453.592,
  pounds: 453.592,

  clove: 0.12,
  cloves: 0.12,
  slice: 0.15,
  slices: 0.15,
  count: 1,
};

export const imperialToMetric = (
  amount: number,
  unit: string,
): [number, string] => {
  return [amount * convertAmount[unit], convertUnit[unit]];
};

export const metricToImperial = (amount: number, unit: string) => {
  throw new Error("Unimplemented");
};
