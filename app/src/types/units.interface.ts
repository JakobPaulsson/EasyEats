export enum FluidUnit {
  Cup = "cup (240.0 ml)",
  Teaspoon = "teaspoon (4.9 ml)",
  Tablespoon = "tablespoon (14.8 ml)",
  Pint = "pint (473.2 ml)",
  FluidOunce = "fluid ounce (29.6 ml)",
  Quart = "quart (946.4 ml)",
  Dash = "dash (2.0 ml)",
  Drop = "drop (2.0 ml)",
}

export enum WeightUnit {
  Pinch = "pinch (0.0 g)",
  Ounce = "ounce (28.3 g)",
  Pound = "pound (453.6 g)",
}

export enum CountUnit {
  Clove = "clove (0.12)",
  Slice = "slice (0.12)",
  Count = "count (1.0)",
}

export type UnitCategory = "fluid" | "weight" | "count";

export const UnitTypes = {
  fluid: FluidUnit,
  weight: WeightUnit,
  count: CountUnit,
};
