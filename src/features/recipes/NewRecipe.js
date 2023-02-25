import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import NewRecipeForm from './NewRecipeForm'

const NewRecipe = () => {
    const {userId} = useAuth();
    // const users = useSelector(selectAllUsers)
    const users = useSelector(state => selectUserById(state, userId))

    // if(!users?.length) return <p>Not Currently Available</p>

    const content =  <NewRecipeForm users={users} /> 

    return content
}
export default NewRecipe