export enum FluidUnit {
  Cup = "cup",
  Cups = "cups",
  Teaspoon = "teaspoon",
  Teaspoons = "teaspoons",
  Tablespoon = "tablespoon",
  Tablespoons = "tablespoons",
  Pint = "pint",
  Pints = "pints",
  FluidOunce = "fluid ounce",
  FluidOunces = "fluid ounces",
  Quart = "quart",
  Quarts = "quarts",
  Dash = "dash",
  Dashes = "dashes",
  Drop = "drop",
  Drops = "drops",
}

export enum WeightUnit {
  Pinch = "pinch",
  Pinches = "pinches",
  Ounce = "ounce",
  Ounces = "ounces",
  Pound = "pound",
  Pounds = "pounds",
}

export enum CountUnit {
  Clove = "clove",
  Cloves = "cloves",
  Slice = "slice",
  Slices = "slices",
  Count = "count",
}

export type UnitCategory = "fluid" | "weight" | "count";

export const UnitTypes = {
  fluid: FluidUnit,
  weight: WeightUnit,
  count: CountUnit,
};
