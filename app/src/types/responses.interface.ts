import { Recipe } from "./recipe.interface";

export interface RecipeResponse {
  data: RecipeData;
}

interface RecipeData {
  result: Recipe[];
  count: number;
}
