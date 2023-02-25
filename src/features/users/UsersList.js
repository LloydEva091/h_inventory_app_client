import { useGetUsersQuery } from "./usersApiSlice"
import { Link } from "react-router-dom"
import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <>
                <div className="flex flex-col justify-center items-center place-content-center m-3">
                    <div className="w-full p-2 ">
                        <Link to="/dash/admin/users/new" className="flex justify-center sm:w-full md:w-1/6 mb-3 text-md px-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 border border-green-700 rounded ">NEW</Link>
                        <div className="overflow-auto w-full flex-shrink">
                            <table className="min-w-max w-full table-auto">
                                <thead className="bg-gray-400 text-gray-600 uppercase leading-normal">
                                    <tr className="text-sm">
                                        <th scope="col" className="py-3 px-6 text-left">Email</th>
                                        <th scope="col" className="py-3 px-6 text-left">Roles</th>
                                        <th scope="col" className="py-3 px-6 text-left">Edit</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200 text-gray-600 text-sm font-light w-full">
                                    {tableContent}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return content
}
export default UsersList