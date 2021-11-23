import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

import { RecipeItem } from 'src/models/RecipeItem';

import { configuration } from '../config/config';
import { KeysAndAttributes } from 'aws-sdk/clients/dynamodb';
import e from 'express';

const c = configuration.dev;

const credentials = new AWS.Credentials({
    accessKeyId: c.aws_access_key_id,
    secretAccessKey: c.aws_secret_access_key
});
AWS.config.credentials = credentials;

export const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: c.aws_region
})

export async function getAllRecipes(): Promise<RecipeItem[]>{
    try{
        const result = await dynamoDB.scan({
            TableName: c.recipes_table
        }).promise();
        const items = result.Items;
        return items as RecipeItem[];
    }catch(err){
        console.error(err)
        return []
    }
}

export async function createRecipe(recipe: RecipeItem): Promise<RecipeItem>{

    const recipeId = recipe.title.toLowerCase();

    const { ingredients } = recipe;

    //Create request to check if ingredients exist on the ingredients table
    const params = {
        RequestItems: {} as any
    }
    params.RequestItems[c.ingredients_table] = {
        Keys: ingredients.map(ingredient => {return {ingredientId : ingredient}})
    }
    try{
        const batchGet = await dynamoDB.batchGet(params).promise();
        if(batchGet.Responses && batchGet.Responses[c.ingredients_table]){
            if(batchGet.Responses[c.ingredients_table].length !== ingredients.length){
                throw new Error('An ingredient does not exist on the ingredients table')
            }
        }else{
            throw new Error('Cannot target ingredients table')
        }
    }catch(err){
        console.error(err);
        return {} as RecipeItem
    }
    

    


    const recipeRequest = {
        recipeId,
        ...recipe
    }

    await dynamoDB.put({
        TableName: c.recipes_table,
        Item: recipeRequest,
        ConditionExpression: 'attribute_not_exists(PK)'
    }).promise();

    return recipeRequest
}

export async function deleteRecipe(recipeId: string): Promise<AWS.DynamoDB.AttributeMap>{

    const result = await dynamoDB.delete({
        TableName: c.recipes_table,
        Key:{
            recipeId
        },
        ReturnValues: 'ALL_OLD'
    }).promise()

    return result.Attributes;
}

export async function getMatchingRecipes(title: string, ingredients: string):  Promise<RecipeItem[]>{
    try{
        let filterExpression: string = '';
        let expressionAttributeNames: any = {}
        let expressionAttributeValues: any = {}

        if(title){
            filterExpression += 'contains(#recipeId, :recipeId)'
            expressionAttributeNames['#recipeId'] = 'recipeId'
            expressionAttributeValues[':recipeId'] = title.toLowerCase()
        }

        let ingredientsObj: any = {}


        if(ingredients){
            filterExpression += title ? ' and (' : ''
            const ingredientsArray = ingredients.split(',')
            ingredientsArray.forEach((ingredient,i) => {
                filterExpression += ` contains(#ingredients, :ingredient${i})`
                if(i + 1 !== ingredientsArray.length){
                    filterExpression += ' or '
                }else{
                    filterExpression += title ? ')' : ''
                }
                ingredientsObj[`:ingredient${i}`] = ingredient
            })
            expressionAttributeNames['#ingredients'] = 'ingredients'
        }


        const result = await dynamoDB.scan({
            TableName: c.recipes_table,
            
            FilterExpression: filterExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues:{
                ...expressionAttributeValues,
                ...ingredientsObj
            }
        }).promise()
        const items = result.Items;
        return items as RecipeItem[];
    }catch(err){
        console.error(err)
        return []
    }
}