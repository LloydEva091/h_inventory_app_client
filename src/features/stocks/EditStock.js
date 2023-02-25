import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectStockById } from './stocksApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditStockForm from './EditStockForm'

const EditStock = () => {
    const { id } = useParams()

    const stock = useSelector(state => selectStockById(state, id))
    const users = useSelector(selectAllUsers)

    const content = stock && users ? <EditStockForm stock={stock} users={users} /> : <p>Loading...</p>

    return content
}
export default EditStock