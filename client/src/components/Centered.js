import { withStyles } from 'arwes';

const styles = () => ({
    root: {
        margin : '0 auto',
        paddingLeft: 40,
        paddingRight: 40,
        width: 'fit-content',
        maxWidth: '100%'
    },
    '@media (max-width: 800px)': {
        root:{
            paddingLeft: 20,
            paddingRight: 20,
        }
    }
})

const Centered = props => {
    const {
        classes,
        className,
        children,
        ...rest
    } = props;
    
    return (
        <div className={`${classes.root} ${className}`} {...rest}>
            {children}
        </div>
    )
}

export default withStyles(styles)(Centered)