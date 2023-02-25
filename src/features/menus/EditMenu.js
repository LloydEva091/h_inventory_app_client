import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import EditMenuForm from './EditMenuForm'
import useMenuDetails from '../../hooks/useMenuDetails'


const EditMenu = () => {
    const { id } = useParams()
    // console.log(id)
    // const menu = useSelector(state => selectMenuById(state, id))
    const menu = useMenuDetails(id)
    // console.log(menu)

    const content = menu ? <EditMenuForm menu={menu} /> : <p>Loading...</p>

    return content
}
export default EditMenu