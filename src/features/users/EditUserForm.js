import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/constant"
// import useAuth from "../../hooks/useAuth"

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const NAME_REGEX = /^[A-z\s]{2,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    // const { userId } = useAuth();

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [email, setEmail] = useState(user.email)
    const [validEmail, setValidEmail] = useState(false)
    const [name, setName] = useState(user.name)
    const [validName, setValidName] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)



    useEffect(() => {
        setValidName(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setEmail('')
            setName('')
            setPassword('')
            setRoles([])
            navigate('/dash/admin/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onEmailChanged = e => setEmail(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, email, name, password, roles, active })
        } else {
            await updateUser({ id: user.id, email, name, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validEmail, validName, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validEmail, validName].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validEmail ? 'form__input--incomplete' : ''
    const validNameClass = !validName ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    // let deleteButton = null
    // if (isManager || isAdmin) {
    //     deleteButton = (
    //         <button
    //             className="icon-button"
    //             title="Delete"
    //             onClick={onDeleteNoteClicked}
    //         >
    //             <FontAwesomeIcon icon={faTrashCan} />
    //         </button>
    //     )
    // }

    const content = (
        <>
            <div className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
                <div className="uppercase text-2xl">
                    <h2>Edit User</h2>
                </div>
                <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">
                    <p className={errClass}>{errContent}</p>

                    <form className="form" onSubmit={e => e.preventDefault()}>
                        <label className="form__label" htmlFor="email">
                            Email:</label>
                        <input
                            className={`form__input ${validUserClass} text-black`}
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="off"
                            value={email}
                            onChange={onEmailChanged}
                        />
                        <label className="form__label" htmlFor="user-name">
                            Name: </label>
                        <input
                            className={`form__input ${validNameClass} text-black`}
                            id="user-name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={onNameChanged}
                        />
                        <label className="form__label" htmlFor="password">
                            Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                        <input
                            className={`form__input ${validPwdClass} text-black`}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />
{/* 
                        <label className="form__label form__checkbox-container" htmlFor="user-active">
                            ACTIVE:
                            <input
                                className="form__checkbox"
                                id="user-active"
                                name="user-active"
                                type="checkbox"
                                checked={active}
                                onChange={onActiveChanged}
                            />
                        </label> */}

                        <label className="form__label" htmlFor="roles">
                            ASSIGNED ROLES:</label>
                        <select
                            id="roles"
                            name="roles"
                            className={`form__select ${validRolesClass} text-black`}
                            multiple={true}
                            size="3"
                            value={roles}
                            onChange={onRolesChanged}
                        >
                            {options}
                        </select>

                        {/* <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveUserClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                            <button
                                className="icon-button"
                                title="Delete"
                                onClick={onDeleteUserClicked}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button> */}
                        {/* {deleteButton} A way to only allow certain roles the delete option  */}

                        <div className='grid grid-cols-3 gap-1 w-full m-5 p-2'>
                            <div className="flex justify-end mr-5">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700 rounded w-full"
                                    title="Save"
                                    type="submit"
                                    onClick={onSaveUserClicked}
                                    disabled={!canSave}
                                >
                                    Save
                                </button>
                            </div>
                            <div className="flex justify-start mr-5">
                                <button
                                    className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full"
                                    title="Delete"
                                    onClick={onDeleteUserClicked}
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="flex text-center mr-5">
                                <Link
                                    className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded w-full"
                                    to="/dash/admin/users"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    return content
}
export default EditUserForm