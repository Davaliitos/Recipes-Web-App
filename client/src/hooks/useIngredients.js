import { useCallback, useEffect, useState } from "react";

import { httpCreateIngredient, httpDeleteIngredient, httpGetIngredients} from './requests'

function useIngredients(onSuccessSound, onAbortSound, onFailureSound){
    const [ingredients, saveIngredients] = useState([]);
    const [isPendingCreation, setPendingCreation]= useState(false)

    // Get Ingredients Hook
    const getIngredients = useCallback(async () => {
        const fetchedIngredients = await httpGetIngredients();
        saveIngredients(fetchedIngredients);
    },[])

    useEffect(() => {
        getIngredients();
    },[getIngredients]);    

    //Submit Ingredient hook
    const createIngredient = useCallback(async (formData) => {
        
        setPendingCreation(true);
        const response = await httpCreateIngredient(formData)

        const success = response.ok;
        if(success){
            getIngredients();
            setTimeout(() => {
                setPendingCreation(false);
                onSuccessSound();
            },800)
        }else{
            onFailureSound()
        }

    },[getIngredients, onSuccessSound, onFailureSound])

    const deleteIngredient = useCallback(async (id) => {
        const response = await httpDeleteIngredient(id);

        const success = response.ok;
        if(success){
            getIngredients();
            onAbortSound();
        }else{
            onFailureSound();
        }
    },[getIngredients, onAbortSound, onFailureSound])


    return{
        ingredients,
        deleteIngredient,
        createIngredient,
        isPendingCreation
    }
}

export default useIngredients