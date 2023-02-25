import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'


const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    // Make it so that when page is loaded it put the focus into the email input in the form
    useEffect(() => {
        userRef.current.focus()
    }, [])
    // Reset the error msg after the user change the email and password
    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <>
            <div className="min-h-screen pt-14 px-2 pb-2 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 p-4 w-full max-w-md border rounded bg-slate-500 bg-opacity-25">
                    <header className='font-bold text-2xl flex items-center justify-center gap-2 max-w-max px-2 py-1 mx-auto'>
                        <h1>Login</h1>
                    </header>
                    <main className="login w-full">
                        <p ref={errRef} className={`${errClass}`} aria-live="assertive">{errMsg}</p>

                        <form className="form" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input
                                className="form__input text-black"
                                type="text"
                                id="email"
                                ref={userRef}
                                value={email}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                className="form__input text-black"
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />


                            <label htmlFor="persist" className="form__persist">
                                <input
                                    type="checkbox"
                                    className="form__checkbox"
                                    id="persist"
                                    onChange={handleToggle}
                                    checked={persist}
                                />
                                Keep me logged in
                            </label>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full text-center">Sign In</button>
                            <Link
                                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded w-full text-center"
                                title="cancel"
                                to="/">Cancel</Link>

                        </form>

                    </main>
                    <footer>

                    </footer>
                </div>
            </div>
        </>
    )

    return content
}
export default Login