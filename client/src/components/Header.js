import {
    Logo,
    Words,
    Header as ArwesHeader,
    Highlight,
    withStyles
} from 'arwes'
import { Link } from 'react-router-dom';
import Clickable from './Clickable';
import Centered from './Centered';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        lineHeight: '80px',
        justifyContent: 'center'
    },
    logo:{
        display: 'inherit',
        marginTop: '15px'
    },
    nav: {
        display: 'inherit'
    },
    banner:{
        display: 'inherit',
        fontWeight: 'bold',
        marginLeft: '10px',
        marginRight: '15px',
        fontSize: 28
    },
    clickable: {
        fontSize: 21,
        '& i': {
            marginRight: theme.padding / 2,
            fontSize: 24
        }
    },
    link: {
        color: theme.color.content,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        padding: [0, theme.padding / 2]
    },
    '@media (max-width: 800px)': {
        logo: {
            display: 'none'
        },
        img: {
            display: 'none'
        },
        banner: {
            display: 'none'
        },
        button: {
            padding: [0,8]
        },
        clickable: {
            fontSize: 16
        }
    }
})

const Header = props => {
    const {classes, onNav, ...rest} = props;

    return <ArwesHeader animate>
        <Centered className={classes.root} {...rest}>
            <Logo animate size={50} className={classes.logo} layer="header" />
            <Words animate className={classes.banner}>
                Graphite Recipes
            </Words>
            <nav className={`${classes.nav}`}>
                <Clickable className={classes.clickable} onClick={onNav}>
                    <Highlight className={classes.button} animate layer="header">
                        <Link className={classes.link} to="/">
                            <i className="material-icons">update</i>Recipes List
                        </Link>
                    </Highlight>
                </Clickable>
                <Clickable className={classes.clickable} onClick={onNav}>
                    <Highlight className={classes.button} animate layer="header">
                        <Link className={classes.link} to="/create">
                            <i className="material-icons">check_circle_outline</i>Create Recipe
                        </Link>
                    </Highlight>
                </Clickable>
                <Clickable className={classes.clickable} onClick={onNav}>
                    <Highlight className={classes.button} animate layer="header">
                        <Link className={classes.link} to="/ingredients">
                            <i className="material-icons">update</i>Ingredients List
                        </Link>
                    </Highlight>
                </Clickable>
                <Clickable className={classes.clickable} onClick={onNav}>
                    <Highlight className={classes.button} animate layer="header">
                        <Link className={classes.link} to="/ingredients/create">
                            <i className="material-icons">check_circle_outline</i>Create Ingredient
                        </Link>
                    </Highlight>
                </Clickable>
            </nav>
        </Centered>
    </ArwesHeader>
}

export default withStyles(styles)(Header)