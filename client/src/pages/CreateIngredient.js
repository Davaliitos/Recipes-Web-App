import { Appear, Button, Loading, Paragraph } from 'arwes';
import Clickable from '../components/Clickable';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateIngredient = props => {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            props.createIngredient(formData)
        }
    })
    
    return <Appear animate show={props.entered}>
        <Paragraph>Create an Ingredient</Paragraph>
        <form onSubmit={formik.handleSubmit} style={{display: 'grid', gridTemplateColumns: '50% 50%', gridGap: '10px 0px', 'maxWidth': '450px'}}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={formik.handleChange}/>
            <Clickable>
                <Button
                    animate
                    show={props.entered}
                    buttonProps={{
                        type: 'submit'
                    }}
                    layer="success"
                    disabled={props.isPendingCreation}
                >
                    Create Ingredient
                </Button>
                {
                    props.isPendingCreation &&
                    <Loading animate small/>
                }
            </Clickable>
        </form>
    </Appear>
}

function initialValues(){
    return{
        name: ''
    }
}

function validationSchema(){
    return {
        name: Yup.string().required()
    }
}

export default CreateIngredient