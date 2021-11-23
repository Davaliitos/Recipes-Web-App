import { IngredientItem } from './IngredientItem';

export interface RecipeItem {
    recipeId: string,
    title: string,
    ingredients: IngredientItem[]
}