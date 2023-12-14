import { Recipe } from "./recipe.interface";
import { User } from "./user.interface";

export interface RecipeResponse {
  data: RecipeData;
}

interface RecipeData {
  result: Recipe[];
  count: number;
}

export interface UserResponse {
  data: UserData;
}

interface UserData {
  user: User;
}
