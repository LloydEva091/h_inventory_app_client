import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import NewStockForm from './NewStockForm'

const NewStock = () => {
    const {userId} = useAuth();
    const users = useSelector(state => selectUserById(state, userId))
    const content =  <NewStockForm users={users} /> 

    return content
}
export default NewStock