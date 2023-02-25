import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/admin/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className={`py-3 px-6 text-left ${cellStatus}`}>{user.email}</td>
                <td className={`py-3 px-6 text-left ${cellStatus}`}>{userRolesString}</td>
                <td className={`py-3 px-6 text-left ${cellStatus}`}>
                    <button
                        className="py-3 px-6 text-center"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User