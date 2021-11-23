import { Router, Request, Response } from 'express';
import { RecipesRouter } from './recipes/recipes.router';
import { IngredientsRouter } from './ingredients/ingredients.router';

const router: Router = Router();

router.use('/recipes', RecipesRouter);
router.use('/ingredients', IngredientsRouter );

router.get('/', async (req: Request, res: Response) => {
    res.send('V0');
});

export const IndexRouter: Router = router;