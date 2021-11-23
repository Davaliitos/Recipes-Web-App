const API_URL = 'http://localhost:8000/api/v0';

/*
    Ingredients
*/

//Load ingredients and return as JSON
export async function httpGetIngredients(){
    const response = await fetch(`${API_URL}/ingredients`);
    const ingredientsJSON = await response.json();
    return ingredientsJSON.ingredients
}

//Create Ingredient
export async function httpCreateIngredient(ingredient){
    try{
        return await fetch(`${API_URL}/ingredients`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredient)
        })
    }catch(err){
        return{
            ok: false
        }
    }
}

//Delete ingredient with given id
export async function httpDeleteIngredient(id){
    try{
        return await fetch(`${API_URL}/ingredients/${id}`, {
            method: 'delete'
        });
    }catch(err){
        console.error(err);
        return {
            ok: false
        }
    }
}

/*
    Recipes
*/

//Load recipes and return as JSOn
export async function httpGetRecipes(){
    try{
        const response = await fetch(`${API_URL}/recipes`);
        const recipesJSON = await response.json();
        return recipesJSON.recipes;
    }catch(err){
        console.error(err)
        return []
    }
}

//Load filtered recipes
export async function httpGetFilteredRecipes(search, selectedTags){
    try {
        let url = `${API_URL}/recipes/filtered`;
        if(search){
            url += `?title=${search}`
        }
        if(selectedTags.length > 0){
            url += search ? '&' : '?'
            url += `ingredients=${selectedTags.map(ingredient => ingredient.ingredientId).join(',')}`
        }
        const response = await fetch(url)
        const recipesJSON = await response.json();
        return recipesJSON.recipes;
    }catch(err){
        console.error(err)
        return []
    }
}

//Create recipe
export async function httpCreateRecipe(recipe){
    try{
        return await fetch(`${API_URL}/recipes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
    }catch(err){
        return{
            ok: false
        }
    }
}

//Delete recipe with given id
export async function httpDeleteRecipe(id){
    try{
        return await fetch(`${API_URL}/recipes/${id}`, {
            method: 'delete'
        });
    }catch(err){
        console.error(err);
        return {
            ok: false
        }
    }
}