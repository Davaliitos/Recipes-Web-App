import React, { useMemo, useState } from "react";
import { Appear, Button, Loading, Paragraph } from 'arwes';
import Clickable from '../components/Clickable';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateRecipe = props => {

    const [ingredients, setIngredients] = useState(1);

    const selectorBody = useMemo(() => {
        let options = [];
        options.push(
            <option value="" key="">Please Select</option>
        )
        options.push(...props.ingredients?.map(ingredient => 
            <option value={ingredient.name} key={ingredient.name}>{ingredient.name}</option>
        ))
        return options
    },[props.ingredients])

    const ingredientEntries = []

    for(let i=1; i<=ingredients; i++){
        ingredientEntries.push(
            <React.Fragment key={`ingredient-${i}`}>
                <label htmlFor={`ingredients-selector-${i}`}>{`Ingredient ${i}`}</label>
                <select id={`ingredients-selector-${i}`} name={`ingredients-selector-${i}`} onChange={event => {
                    return formik.setFieldValue(`ingredient-${i}`,event.target.value)
                }}>
                    {selectorBody}
                </select>
            </React.Fragment>
        )
    }


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData, {resetForm}) => {
            props.createRecipe(formData)
            resetForm({})
        }
    })
    
    return <Appear animate show={props.entered}>
        <Paragraph>Create a Recipe</Paragraph>
        <form onSubmit={formik.handleSubmit} style={{display: 'grid', gridTemplateColumns: '50% 50%', gridGap: '10px 0px', 'maxWidth': '450px'}}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" onChange={formik.handleChange}/>
            {ingredientEntries}
            <Clickable>
                <Button
                    layer="primary"
                    buttonProps={{
                        type: 'button'
                    }}
                    onClick={() => setIngredients(ingredients + 1)}
                >
                    Add Ingredient
                </Button>
            </Clickable>
            <Clickable>
                <Button
                    animate
                    show={props.entered}
                    buttonProps={{
                        type: 'submit'
                    }}
                    layer="success"
                    disabled={props.isPendingCreation}
                >
                    Create Recipe
                </Button>
                {
                    props.isPendingCreation &&
                    <Loading animate small/>
                }
            </Clickable>
        </form>
    </Appear>
}

function initialValues(){
    return{
        title: ''
    }
}

function validationSchema(){
    return {
        title: Yup.string().required(),
        'ingredient-1': Yup.string().required()
    }
}

export default CreateRecipe