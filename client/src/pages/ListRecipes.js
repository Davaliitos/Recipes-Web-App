import { useEffect, useMemo, useState } from 'react';
import { Appear, Table, Paragraph, Link, Words,Button, withStyles} from 'arwes';
import { Multiselect } from 'multiselect-react-dropdown';

import Clickable from '../components/Clickable';

const styles = () => ({
    link: {
        color: 'red',
        textDecoration: 'none'
    },
    image:{
        height: '80px'
    },
    firstColumn:{
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    table:{
        overflow: 'auto',
        '& td': {
            'padding': '8px 16px'
        }
    },
    article:{
        overflow: 'auto'
    }
})


const ListRecipes = props => {

    

    const {
        entered,
        recipes,
        classes,
        deleteRecipe,
        getFilteredRecipes,
        ingredients
    } = props;

    const [filteredRecipes, setFilteredRecipes] = useState([])

    const [searchValue, setSearchValue] = useState('')
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        setFilteredRecipes(recipes)
        setSearchValue('');
        setSelectedTags([])
    },[recipes])

    const filterData = async () => {
        const fRecipes = await getFilteredRecipes(searchValue, selectedTags);
        setFilteredRecipes(fRecipes)
    }

    const onSelect = (selectedList) => {
        setSelectedTags(selectedList)
    }

    const onRemove = (selectedList) => {
        setSelectedTags(selectedList)
    }


    const tableBody = useMemo(() => {
        return filteredRecipes?.map(recipe => {

            return <tr key={recipe.recipeId}>
                <td className={classes.firstColumn}>
                    <Clickable style={{color: 'red'}}>
                        <Link className={classes.link} onClick={() => deleteRecipe(recipe.recipeId)}>
                            ✖
                        </Link>
                    </Clickable>
                </td>
                <td>{recipe.title}</td>
                <td>
                    <ul>
                    {
                        recipe.ingredients?.map(ingredient => {
                            return <li>{ingredient}</li>
                        })
                    }
                    </ul>
                </td>
            </tr>
        })
    },[filteredRecipes, deleteRecipe, classes.link, classes.firstColumn])


    return <article className={classes.article} id="games">
        <Appear animate show={entered}>
            <Paragraph>List of Recipes</Paragraph>
            <Words animate>Warning! Clicking on the ✖ deletes the recipe.</Words>
            <br/>
            <div>
            <Words animate>Search for Recipes</Words>
            <input type="text" id="title" name="title" onChange={(e) => setSearchValue(e.target.value)}/>
            <Clickable>
                <Button
                    animate
                    show={props.entered}
                    buttonProps={{
                        type: 'button'
                    }}
                    layer="success"
                    onClick={() => filterData()}
                >
                    Search Recipe
                </Button>
            </Clickable>
            </div>
            <br/>
            <Words animate>Filter By</Words>
            <Multiselect
                showArrow
                options={ingredients}
                displayValue="ingredientId"
                onSelect={onSelect}
                onRemove={onRemove}
            />
            <Table animate>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.firstColumn}></th>
                            <th>Title</th>
                            <th>Ingredients</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </Table>
        </Appear>
    </article>
}

export default withStyles(styles)(ListRecipes)