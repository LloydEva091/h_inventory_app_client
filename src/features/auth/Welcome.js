import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
    const { username, isManager, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome w-full">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            {/* <p><Link to="/dash/stocks">Manage Stocks</Link></p> */}
            
            {(isAdmin) && <p><Link to="/dash/admin/users">Manage Users</Link></p>}
            {/* {(isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>} */}

        </section>
    )

    return content
}
export default Welcome