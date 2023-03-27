import { useEffect, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { Menu, Transition } from '@headlessui/react'
import { UserIcon} from '@heroicons/react/24/outline'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

// Use to compare the location in the URL to verify where we are at and allow app to display certain feature base on location
const DASH_REGEX = /^\/dash(\/)?$/
// const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const STOCKS_REGEX = /^\/dash\/stocks(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    // Check isSuccess, if successfull navigate to route
    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewStockClicked = () => navigate('/dash/stocks/new')
    const onNewUserClicked = () => navigate('/dash/admin/users/new')
    const onStocksClicked = () => navigate('/dash/stocks')
    const onUsersClicked = () => navigate('/dash/admin/users')
    const onAdminClicked = () => navigate('/dash/admin/users')

    if (isLoading) return <p>Logging Out...</p>
    if (isError) return <p>Error: {error.data?.message}</p>

    // let dashClass = null
    // if (!DASH_REGEX.test(pathname) && !STOCKS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    //     dashClass = "dash-header__container--small"
    // }


    let newStockButton = null
    if (STOCKS_REGEX.test(pathname)) {
        newStockButton = (
            <button
                className="icon-button"
                title="New Stock"
                onClick={onNewStockClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className=""
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let stocksButton = null
    if (!STOCKS_REGEX.test(pathname) && pathname.includes('/dash')) {
        stocksButton = (
            <button
                className="icon-button"
                title="Stocks"
                onClick={onStocksClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }


    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    let adminButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            adminButton = (
                <span
                    className='p-2'
                    title="Admin"
                    onClick={onAdminClicked}
                >
                   ADMIN
                </span>
            )
        }
    }

    const links = [
        { href: '/account-settings', label: 'Account settings' },
        { href: '/support', label: 'Support' },
        { href: '/license', label: 'License' },
        { href: '/sign-out', label: 'Sign out' },
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const prof = (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button className="flex rounded-full  text-sm focus:outline-none ">
                    {/* focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 */}
                    <span className="sr-only">Open user menu</span>
                    {/* <span className="text-white mt-3">{USERNAME}</span> */}
                    <UserIcon className="h-6 w-6 text-white m-2" aria-hidden="true" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
                    {/* //For when Profile and Setting is implemented
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-400' : '', 'block px-4 py-2 text-sm text-black')}
                                >
                                    Your Profile
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-400' : '', 'block px-4 py-2 text-sm text-teal-700')}
                                >
                                    Settings
                                </a>
                            )}
                        </Menu.Item> */}
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="/"
                                className={classNames(active ? 'bg-gray-400' : '', 'block px-4 py-2 text-sm text-white')}
                                onClick={() => sendLogout()}
                            >
                                Sign out
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )


const errClass = isError ? "errmsg" : "offscreen"

let buttonContent
if (isLoading) {
    buttonContent = <p>Logging Out...</p>
} else {
    buttonContent = (
        <>
            {/* {newStockButton}
            {newUserButton}
            {stocksButton}
            {userButton}
            {logoutButton} */}
            {adminButton}
            {prof}
        </>
    )
}

const content = (
    <>
        <p className={errClass}>{error?.data?.message}</p>
        <header className="dash-header">
            <div className={`dash-header__container`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">IM_APP</h1>
                </Link>
                <nav className="dash-header__nav">
                    {buttonContent}
                    {/* {logoutButton} */}
                </nav>
            </div>
        </header>
    </>

)

return content
}
export default DashHeader