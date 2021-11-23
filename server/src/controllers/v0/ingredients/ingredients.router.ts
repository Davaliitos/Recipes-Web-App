import { Router, Request, Response } from 'express';
import { IngredientItem } from '../../../models/IngredientItem';
import { createIngredient, deleteIngredient, getAllIngredients } from '../../../dataLayer/ingredientsAccess';

const router: Router = Router();

//Get All Ingredient items
router.get('/', async( req: Request, res: Response ) => {
    try{
        const ingredients = await getAllIngredients();
        res.send(JSON.stringify({ingredients}))
    }catch(err){
        res.status(400).send({
            error: err
        })
    }
})

//Create Ingredient
router.post('/', async(req: Request, res: Response) => {
    try{
        const {
            name
        } = req.body as IngredientItem;
        
        if(!name){
            return res.status(400).send({
                message: 'Bad Request'
            })
        }

        const ingredient = await createIngredient({
            name
        } as IngredientItem);
        res.status(201).send(ingredient);
    }catch(err){
        res.status(500).send({
            error: err
        })
    }
})

//Delete Ingredient
router.delete('/:ingredientId', async(req: Request, res: Response) => {
    const { ingredientId } = req.params;
    try{
        const answer = await deleteIngredient(ingredientId);
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

export const IngredientsRouter: Router = router;