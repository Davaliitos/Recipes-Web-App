import { useState } from 'react';
import { Routes, Route} from 'react-router-dom'
import { Frame, withSounds, withStyles } from 'arwes'

import useIngredients from '../hooks/useIngredients';
import useRecipes from '../hooks/useRecipes';

import Centered from '../components/Centered';
import Header from '../components/Header';

import ListIngredients from './ListIngredients';
import CreateIngredient from './CreateIngredient';
import ListRecipes from './ListRecipes';
import CreateRecipe from './CreateRecipe';

const styles = () => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        margin: 'auto'
    },
    centered: {
        flex: 1,
        paddingTop: '20px',
        paddingBottom: '10px'
    }
})

const AppLayout = props => {
    const { sounds, classes } = props;
    const [frameVisible, setFrameInvisible] = useState(true);
    const animateFrame = () => {
        setFrameInvisible(false);
        setTimeout(() => {
            setFrameInvisible(true)
        },600)
    }

    const onSuccessSound = () => sounds.success && sounds.success.play();
    const onAbortSound = () => sounds.abort && sounds.abort.play();
    const onFailureSound = () => sounds.warning && sounds.warning.play();

    const { ingredients, isPendingCreation, createIngredient, deleteIngredient } = useIngredients(onSuccessSound, onAbortSound, onFailureSound)
    const { recipes, isPendingCreationRecipe, createRecipe, deleteRecipe, getFilteredRecipes } = useRecipes(onSuccessSound, onAbortSound, onFailureSound);

    return <div className={classes.content}>
        <Header onNav={animateFrame}/>
        <Centered className={classes.centered}>
            <Frame animate
                show={frameVisible}
                corners={4}
                style={{visibility: frameVisible ? 'visible' : 'hidden' }}
            >
                {
                    anim => (
                        <div style={{padding: '20px'}}>
                        <Routes>
                            <Route exact path='/' element={
                                <ListRecipes
                                    entered={anim.entered}
                                    recipes={recipes}
                                    deleteRecipe={deleteRecipe}
                                    getFilteredRecipes={getFilteredRecipes}
                                    ingredients={ingredients}
                                />
                            }>
                            </Route>
                            <Route exact path='/create' element={
                                <CreateRecipe
                                    entered={anim.entered}
                                    ingredients={ingredients}
                                    createRecipe={createRecipe}
                                    isPendingCreation={isPendingCreationRecipe}
                                />
                            }>
                            </Route>
                            <Route exact path='/list/ingredients' element={
                                <ListIngredients
                                    entered={anim.entered}
                                    ingredients={ingredients}
                                    deleteIngredient={deleteIngredient}
                                />
                            }>
                            </Route>
                            <Route exact path='/create/ingredients' element={
                                <CreateIngredient
                                    entered={anim.entered}
                                    createIngredient={createIngredient}
                                    isPendingCreation={isPendingCreation}
                                />
                            }>
                            </Route>
                        </Routes>
                        </div>
                    )
                }
            </Frame>
        </Centered>
    </div>
}

export default withSounds()(withStyles(styles)(AppLayout));