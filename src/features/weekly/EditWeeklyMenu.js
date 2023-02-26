import { useParams } from 'react-router-dom'
import EditWeeklyMenuForm from './EditWeeklyMenuForm'
import useWeeklyMenuDetails from '../../hooks/useWeeklyMenuDetails'


const EditWeeklyMenu = () => {
    const { id } = useParams()
    const weeklyMenu = useWeeklyMenuDetails(id)
    const content = weeklyMenu ? <EditWeeklyMenuForm weeklyMenu={weeklyMenu}/> : <p>Loading...</p>
    return content
}
export default EditWeeklyMenu