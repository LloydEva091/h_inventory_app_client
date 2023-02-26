import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import NewWeeklyMenuForm from './NewWeeklyMenuForm'

const NewMenu = () => {
    const {userId} = useAuth();
    const users = useSelector(state => selectUserById(state, userId))
    
    if (users === undefined) {
        return <div>Loading...</div>;
    }


    const content =  <NewWeeklyMenuForm users={users} /> 

    return content
}
export default NewMenu