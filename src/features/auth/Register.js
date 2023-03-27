import { useCallback, useRef, useState, useEffect } from "react"
import { useAddNewUserMutation } from "../users/usersApiSlice"
import { Link, useNavigate } from "react-router-dom"
// import { ROLES } from "../../config/constant"

const USER_REGEX = /^[A-z0-9]{3,20}$/
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const NAME_REGEX = /^[A-z\s]{2,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/



const Register = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()
    const navigate = useNavigate()
    const userRef = useRef()
    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [roles, setRoles] = useState(["User"]) // Default user creation as normal User
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [validPassword2, setValidPassword2] = useState(false)
    const [validName, setValidName] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [errorAlertMessage, setErrorAlertMessage] = useState('');



    // Make it so that when page is loaded it put the focus into the email input in the form
    useEffect(() => {
        userRef.current.focus()
    }, [])
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
        setValidPassword2(PWD_REGEX.test(password2))
    }, [password2])

    useEffect(() => {
        if (isSuccess) {
            setEmail('')
            setName('')
            setPassword('')
            setPassword2('')
            setRoles([])
        }
    }, [isSuccess, navigate])


    const onEmailChanged = e => setEmail(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onPassword2Changed = e => setPassword2(e.target.value)

    const canSave = [validEmail, validName, validPassword, validPassword2].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (password === password2) {
            if (canSave) {
                await addNewUser({ email, name, password, roles })
                setAlertVisible(true);
                setAlertMessage('Sign up successful!  ');
            }
        } else {
            setErrorAlertMessage("Password must match  ")
            setErrorAlertVisible(true)
        }
    }

    const handleCloseAlert = useCallback(() => {
        setAlertVisible(false);
        // navigate to the root after closing the alert
        navigate('/');
    }, [navigate]);


    const handleCloseError = () => {
        setErrorAlertVisible(false);
    }

    // close the alert automatically after 5 seconds
    useEffect(() => {
        if (alertVisible) {
            const timer = setTimeout(() => {
                handleCloseAlert();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alertVisible, handleCloseAlert]);

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validEmail ? 'form__input--incomplete' : ''
    const validNameClass = !validName ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validPwd2Class = !validPassword2 ? 'form__input--incomplete' : ''


    const content = (
        <>
            <div className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">

                <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">
                    <p className={errClass}>{error?.data?.message}</p>
                    {errorAlertVisible && (
                        <div className="bg-red-500 text-white py-2 px-4 rounded-md">
                            <div className="flex justify-between">
                                <p>{errorAlertMessage}</p>
                                <button className="place-items-end" onClick={handleCloseError}>x</button>
                            </div>
                        </div>
                    )}
                    {alertVisible && (
                        <div className="bg-green-500 text-white py-2 px-4 rounded-md">
                            <div className="flex justify-between">
                                <p>{alertMessage}</p>
                                <button onClick={handleCloseAlert} className="place-items-end">x</button>
                            </div>
                        </div>
                    )}
                    <header className="font-bold text-2xl flex items-center justify-center gap-2 max-w-max px-2 py-1 mx-auto">
                        <h2>Register</h2>
                    </header>
                    <main className="login">

                        <form className="form" onSubmit={onSaveUserClicked}>

                            <label className="form__label" htmlFor="email">
                                Enter Email:</label>
                            <input
                                className={`form__input ${validUserClass} text-black`}
                                id="email"
                                name="email"
                                ref={userRef}
                                type="text"
                                autoComplete="off"
                                value={email}
                                onChange={onEmailChanged}
                            />
                            <label className="form__label" htmlFor="user-name">
                                Enter Name: </label>
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
                                Enter Password:</label>
                            <input
                                className={`form__input ${validPwdClass} text-black`}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onPasswordChanged}
                            />
                            <label className="form__label" htmlFor="password2">
                                Confirm Password:</label>
                            <input
                                className={`form__input ${validPwd2Class} text-black`}
                                id="password2"
                                name="password2"
                                type="password"
                                value={password2}
                                onChange={onPassword2Changed}
                            />
                            <div className="flex w-full">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full text-center"
                                    title="Save"
                                    type="submit"
                                // disabled={!canSave}
                                >
                                    Submit
                                </button>
                            </div>
                            <div className="flex w-full">
                                <Link
                                    className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
                                    title="cancel"
                                    to="/"
                                >
                                    Cancel
                                </Link>
                            </div>
                            {/* <button type="submit">Submit</button> */}

                        </form>

                    </main>
                </div>
            </div>
        </>
    )

    return content
}
export default Register