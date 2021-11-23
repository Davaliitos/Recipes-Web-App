import { Router, Request, Response } from 'express';
import { RecipeItem } from '../../../models/RecipeItem';
import { createRecipe, getAllRecipes, deleteRecipe, getMatchingRecipes } from '../../../dataLayer/recipesAccess';

const router: Router = Router();

//Get all recipe items
router.get('/', async( req: Request, res: Response) => {
    try{
        const recipes = await getAllRecipes();
        res.send(JSON.stringify({recipes}))
    }catch(err){
        res.status(400).send({
            error: err
        })
    }
})

//Create recipe
router.post('/', async(req: Request, res: Response) => {
    try{
        const{
            title,
            ingredients
        } = req.body as RecipeItem

        if(!title || !ingredients){
            return res.status(400).send({
                message: 'Bad Request'
            })
        }

        const recipe = await createRecipe({
            title,
            ingredients
        } as RecipeItem);
        res.status(201).send(recipe);
    }catch(err){
        res.status(500).send({
            error: err
        })
    }
})

//Delete Recipe
router.delete('/:recipeId', async(req: Request, res: Response) => {
    const { recipeId } = req.params;
    try{
        const answer = await deleteRecipe(recipeId);
        if(answer){
            res.send(answer);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        res.status(400).send({
            error: err
        })
    }
})


//Search Recipe by title
router.get('/filtered', async(req: Request, res: Response) => {
    const title = req.query.title as string;
    const ingredients = req.query.ingredients as string;

    if(!title && !ingredients){
        try{
            const recipes = await getAllRecipes();
            return res.send(JSON.stringify({recipes}))
        }catch(err){
            return res.status(400).send({
                error: err
            })
        }
    }

    try{
        const recipes = await getMatchingRecipes(title, ingredients);
        res.send(JSON.stringify({recipes}))
    }catch(err){
        res.status(400).send({
            error: err
        })
    }
})

export const RecipesRouter: Router = router;