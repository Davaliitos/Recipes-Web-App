import { config } from 'dotenv'

if(process.env.NODE_ENV !== 'production'){
    config();
}

export const configuration = {
    'dev': {
        'aws_region': process.env.AWS_REGION,
        'aws_profile': process.env.AWS_PROFILE,
        'recipes_table': process.env.RECIPES_TABLE,
        'ingredients_table': process.env.INGREDIENTS_TABLE,
        'aws_access_key_id': process.env.AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': process.env.AWS_SECRET_ACCESS_KEY
    }
}