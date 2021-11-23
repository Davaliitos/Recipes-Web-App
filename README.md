# Recipes-Web-App

Graphite's Recipes Web App allows users to register and create new recipes, as well as ingredients

The project is split into two parts:
1. Frontend - React web application
2. Backend RESTful API - Node-Express application

# Functionality of the application

This application will allow creating/removing/fetching recipes and ingredients.

# Recipe Item

The application stores RecipeItems, each Recipe contains the following fields:

* `recipeId` (string) - a unique id for a game
* `title` (string) - name of the recipe
* `ingredients` (array) - array of Ingredient objects
  * `ingredientId` (string) - an id for an ingredient
  * `name` (string) - the name of an ingredient

# Recipe Item

The application stores also IngredientItems, each IngredientItem contains the following fields:

* `ingredientId` (string) - an id for an ingredient
* `name` (string) - the name of an ingredient

# Implemented Functions

* `GetRecipes` - returns all recipes.

It should return data that looks like this:

```json
{
  "recipes": [
    {
      "recipeId": "salt sandwich",
      "title": "Salt Sandwich",
      "ingredients": [{
          "ingredientId": "salt",
          "name": "Salt"
      },{
          "ingredientId": "bread",
          "name": "Bread"
      }]
    }
  ]
}
```

* `CreateRecipe` - creates a new RecipeItem. A shape of data send by a client application to this function can be found in the `RecipeItem.ts` file

It received a new RecipeItem to be created in JSON format that looks like this:

```json
{
    "recipeId": "salt sandwich",
    "title": "Salt Sandwich",
    "ingredients": [{
        "ingredientId": "salt",
        "name": "Salt"
    },{
        "ingredientId": "bread",
        "name": "Bread"
    }]
}
```

It should return a new RecipeItem

* `DeleteRecipe` - deletes a RecipeItem created.

Returns the deleted RecipeItem.

* `Get Matching Recipes` - Gets a list of matching recipes. Can be filtered by title or by ingredients

* `GetIngredients` - returns all ingredients.

It should return data that looks like this:

```json
{
  "ingredients": [
    {
      "ingredientId": "salt",
      "name": "Sa;t"
    }
  ]
}
```

* `CreateIngredient` - creates a new IngredientItem. A shape of data send by a client application to this function can be found in the `IngredientItem.ts` file

It received a new IngredientItem to be created in JSON format that looks like this:

```json
{
    "name": "Sa;t"
}
```

It should return a new IngredientItem

* `DeleteIngredient` - deletes a IngredientItem created.

Returns the deleted IngredientItem.

# Frontend

The `client` folder contains a web application that can connect to the API.

