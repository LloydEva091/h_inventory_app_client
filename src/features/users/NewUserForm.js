import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate, Link } from "react-router-dom"
import { ROLES } from "../../config/constant"

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const NAME_REGEX = /^[A-z\s]{2,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [name , setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [roles, setRoles] = useState(["User"])

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
        if (isSuccess) {
            setEmail('')
            setName('')
            setPassword('')
            setRoles([])
            navigate('/dash/admin/users')
        }
    }, [isSuccess, navigate])

    const onEmailChanged = e => setEmail(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onCancel = () => navigate('/dash/admin/users')

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validEmail, validName, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ email, name, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validEmail ? 'form__input--incomplete' : ''
    const validNameClass = !validName ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <div className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
                <div className="uppercase text-2xl">
                    <h2>New User</h2>
                </div>
                <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">

                    <p className={errClass}>{error?.data?.message}</p>

                    <form className="form" onSubmit={onSaveUserClicked}>

                        <label className="form__label" htmlFor="email">
                            Email: </label>
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
                            Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                        <input
                            className={`form__input ${validPwdClass} text-black`}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />

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
                        <div className='grid grid-cols-2 gap-1 w-full m-5'>
                            <div className="flex justify-end mr-5">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700 rounded w-1/2"
                                    title="Save"
                                    type="submit"
                                    onClick={onSaveUserClicked}
                                >
                                    Save
                                </button>
                            </div>
                            <div className="flex justify-start">
                                <Link
                                    className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-1/2"
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
export default NewUserForm