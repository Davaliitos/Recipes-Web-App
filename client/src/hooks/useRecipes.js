import { useCallback, useEffect, useState } from "react";

import { httpCreateRecipe, httpDeleteRecipe, httpGetRecipes, httpGetFilteredRecipes} from './requests'

function useRecipes(onSuccessSound, onAbortSound, onFailureSound){
    const [recipes, saveRecipes] = useState([]);
    const [isPendingCreationRecipe, setPendingCreation]= useState(false)

    // Get Recipes Hook
    const getRecipes = useCallback(async () => {
        const fetchedRecipes = await httpGetRecipes();
        saveRecipes(fetchedRecipes);
    },[])

    useEffect(() => {
        getRecipes();
    },[getRecipes]);



    // Get FilteredRecipes Hook
    const getFilteredRecipes = useCallback(async (search, selectedTags) => {
        const fetchedRecipes = await httpGetFilteredRecipes(search, selectedTags);
        return fetchedRecipes
    },[])

    //Submit Recipes hook
    const createRecipe = useCallback(async (formData) => {
        
        setPendingCreation(true);

        const { title, ...ingredients } = formData;
    
        const recipe = {
            title,
            ingredients: Object.values(ingredients)
        }
        


        const response = await httpCreateRecipe(recipe)

        const success = response.ok;
        if(success){
            getRecipes();
            setTimeout(() => {
                setPendingCreation(false);
                onSuccessSound();
            },800)
        }else{
            onFailureSound()
        }

    },[getRecipes, onSuccessSound, onFailureSound])

    const deleteRecipe = useCallback(async (id) => {
        const response = await httpDeleteRecipe(id);

        const success = response.ok;
        if(success){
            getRecipes();
            onAbortSound();
        }else{
            onFailureSound();
        }
    },[getRecipes, onAbortSound, onFailureSound])


    return{
        recipes,
        getFilteredRecipes,
        deleteRecipe,
        createRecipe,
        isPendingCreationRecipe
    }
}

export default useRecipes