import { useMemo } from 'react';
import { Appear, Table, Paragraph, Link, Words, withStyles } from 'arwes';

import Clickable from '../components/Clickable';

const styles = () => ({
    link: {
        color: 'red',
        textDecoration: 'none'
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



const ListIngredients = props => {

    const {
        entered,
        ingredients,
        classes,
        deleteIngredient
    } = props;



    const tableBody = useMemo(() => {
        return ingredients?.map(ingredient => {

            return <tr key={ingredient.ingredientId}>
                <td className={classes.firstColumn}>
                    <Clickable style={{color: 'red'}}>
                        <Link className={classes.link} onClick={() => deleteIngredient(ingredient.ingredientId)}>
                            ✖
                        </Link>
                    </Clickable>
                </td>
                <td>{ingredient.name}</td>
            </tr>
        })
    },[ingredients, deleteIngredient, classes.link, classes.firstColumn])

    return <article className={classes.article} id="ingredients">
        <Appear animate show={entered}>
            <Paragraph>List of Ingredients</Paragraph>
            <Words animate>Warning! Clicking on the ✖ deletes the ingredient.</Words>
            <Table animate>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.firstColumn}></th>
                            <th>Name</th>
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

export default withStyles(styles)(ListIngredients)