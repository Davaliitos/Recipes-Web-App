import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

import { IngredientItem } from 'src/models/IngredientItem';

import { configuration } from '../config/config';

const c = configuration.dev;

const credentials = new AWS.Credentials({
    accessKeyId: c.aws_access_key_id,
    secretAccessKey: c.aws_secret_access_key
});
AWS.config.credentials = credentials;

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: c.aws_region
})

export async function getAllIngredients(): Promise<IngredientItem[]>{
    try{
        const result = await dynamoDB.scan({
            TableName: c.ingredients_table
        }).promise();
        const items = result.Items;
        return items as IngredientItem[]
    }catch(err){
        console.error(err);
        return[]
    }
}

export async function createIngredient(ingredient: IngredientItem): Promise<IngredientItem>{
    
    const ingredientObj = {
        ingredientId: ingredient.name,
        ...ingredient
    }

    await dynamoDB.put({
        TableName: c.ingredients_table,
        Item: ingredientObj,
        ConditionExpression: 'attribute_not_exists(PK)'
    }).promise()

    return ingredient;
}

export async function deleteIngredient(ingredientId: string): Promise<AWS.DynamoDB.AttributeMap>{

    const result = await dynamoDB.delete({
        TableName: c.ingredients_table,
        Key:{
            ingredientId
        },
        ReturnValues: 'ALL_OLD'
    }).promise()

    return result.Attributes;
}