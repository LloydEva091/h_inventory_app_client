import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import EditRecipeForm from './EditRecipeForm'
import useRecipeDetails from '../../hooks/useRecipeDetails'


const EditRecipe = () => {
    const { id } = useParams()
    // console.log(id)
    // const recipe = useSelector(state => selectRecipeById(state, id))
    const recipe = useRecipeDetails(id)
    // console.log(recipe)

    const content = recipe  ? <EditRecipeForm recipe={recipe}  /> : <p>Loading...</p>

    return content
}
export default EditRecipe