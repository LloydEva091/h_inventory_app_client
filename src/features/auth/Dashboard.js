import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import LineChart from '../../components/LineChart'
import BarChart from '../../components/BarChart'

import WeeklyDisplay from '../../components/WeeklyDisplay'


const Dashboard = () => {
    const { username, isManager, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const sampleData = [
        { name: 'January', value: 6500 },
        { name: 'February', value: 5900 },
        { name: 'March', value: 8000 },
        { name: 'April', value: 8100 },
        { name: 'May', value: 5600 },
        { name: 'June', value: 7200 },
        { name: 'July', value: 6000 },
        { name: 'August', value: 5500 },
        { name: 'September', value: 7000 },
        { name: 'October', value: 6000 },
        { name: 'November', value: 9000 },
        { name: 'December', value: 10000 },
    ]

    const wklyData = [
        { day: 'Monday', breakfast: ['Cereal', 'Porridge', 'Toast'], lunch: ['Celery Soup', 'Steak Pie', 'Cajun Chicken'], dinner: ['Roast Ham', 'Cottage Pie', 'Ice Cream'] },
        { day: 'Tuesday', breakfast: ['Cereal', 'Porridge', 'Toast'], lunch: ['Lentil Soup', 'Beef Stroganoff', 'Mince & Tatties'], dinner: ['Poach Haddock & Parsley Sauce', 'Roast Lamb', 'Artic Roll'] },
        { day: 'Wednesday', breakfast: ['Cereal', 'Porridge', 'Toast'], lunch: ['Scotch Broth', 'Fish & Chips', 'Quiche'], dinner: ['Haggis, Nips & Tatties', 'Pasta Bolognese', 'Fruit Cocktail'] },
        { day: 'Thursday', breakfast: ['Cereal', 'Porridge', 'Toast'], lunch: ['Potato & Leek Soup', 'Pork Chop', 'Battered Chicken'], dinner: ['Chili Con Carni', 'Roast Pork', 'Raspberry & Apple Crumble'] },
        { day: 'Friday', breakfast: ['Cereal', 'Porridge', 'Toast'], lunch: ['Cauliflower Soup', 'Scoth Pie', 'Roast Chicken'], dinner: ['Fish Cakes', 'Beef Casserole', 'Strawberry Gateau'] },
        { day: 'Saturday', breakfast: ['Cereal', 'Porridge', 'Toast'], lunch: ['Pea & Ham Soup', 'Beef Burgers', 'Sweet & Sour Chicken'], dinner: ['York Ham Salad', 'Scampi & Chips', 'Black Forest Gateau'] },
        { day: 'Sunday', breakfast: ['Cereal', 'Porridge', 'Toast'], lunch: ['Tomato Soup', 'Mac & Cheese, Chips', 'Cajun Chicken'], dinner: ['Roast Beef', 'Scramble Egg, Toast & Beans', 'Apple Crumble Custard'] },
    ]


    const content = (
        <>
            {/* <section className="welcome">

                    <p>{today}</p>

                    <h1>Welcome {username}!</h1>

                    <p><Link to="/dash/stocks">Manage Stocks</Link></p>
                       <div className="b mx-auto h-16 w-64 flex justify-center items-center">
                                <div className="i h-16 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                </div>
                                <Link to="/dash/stocks" className="text-center text-white font-semibold z-10 pointer-events-none">Manage Stock</Link>
                            </div>

                    {(isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}
                    {(isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

                </section> */}

            <div className="flex flex-wrap w-screen">
                <div className='grid gap-2 sm:grid-rows-1 w-full'>
                    {/* Weekly Menu Section */}
                    <div className="w-full h-full bg-slate-500 bg-opacity-40 mb-2">
                        <div className='grid md:grid-cols-7 gap-2 sm:grid-cols-2 w-full p-2'>
                            <WeeklyDisplay props={wklyData}></WeeklyDisplay>
                        </div>
                    </div>


                    <div className='grid md:grid-cols-2 gap-1 sm:grid-cols-1 w-full'>
                        {/* Notification */}
                        <div className=" h-72 bg-slate-500 bg-opacity-40">
                            <div className='flex items-center justify-center m-5'>
                                <div className='grid grid-cols-1 w-full'>
                                    <div className='bg-slate-200 h-10 w-full'>
                                        <span className='flex px-3 py-2 text-black font-semibold z-10 pointer-events-none'>Notifications</span>
                                    </div>
                                    <div className='bg-white h-48 w-full'>
                                        <ul className='grid grid-rows-3 text-black list-disc px-7'>
                                            {/* Will only display 3 li and slice the rest */}
                                            {
                                                [
                                                    <li className='px-3 py-2' key='noti1'><span>A check of the stock is necessary.</span></li>,
                                                    <li className='px-3 py-2' key='noti2'><span>New stock added.</span></li>,
                                                    <li className='px-3 py-2' key='noti3'><span>The order list was produced.</span></li>,
                                                    <li className='px-3 py-2' key='noti4'><span>Sample Text</span></li>,
                                                    <li className='px-3 py-2' key='noti5'><span>Sample Text</span></li>,
                                                ].slice(0, 3)
                                            }
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Stats */}
                        <div className="w-full h-72 bg-slate-500 bg-opacity-40 mb-2 justify-center items-center">
                            <div className='flex items-center justify-center m-5'>
                                <div className='grid grid-cols-1 w-full'>
                                    <div className='bg-slate-200 h-10 w-full'>
                                        <span className='flex px-3 py-2 text-black font-semibold z-10 pointer-events-none'>Statistics</span>
                                    </div>
                                    <div className='flex w-full h-48 bg-white'>
                                        <BarChart props={sampleData} className="flex item-center"></BarChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-90 bg-slate-500 bg-opacity-40 mb-2'>
                            {/* <BarChart></BarChart>         */}
                        </div>

                    </div>

                    {/* Buttons Section */}
                    <div className="w-full h-50 bg-slate-500 bg-opacity-40">
                        <div className='flex items-center justify-center m-5'>
                            <div className="grid lg:grid-cols-4 gap-8 md:grid-cols-1">
                                <Link to="/dash" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-green-700 to-green-400 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Confirm Todays Menu</span>
                                </Link>
                                <Link to="/dash/stocks" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Manage Stocks</span>
                                </Link>
                                <Link to="/dash/recipes" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Manage Recipes</span>
                                </Link>
                                <Link to="/dash/menus" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Manage Menus</span>
                                </Link>


                                <Link to="/dash/stocks" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Create Order List</span>
                                </Link>
                                <Link to="/dash/recipes" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Create Monthly Menu Plan</span>
                                </Link>
                                <Link to="/dash/menus" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-cyan-600 to-cyan-300 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Create Weekly Menu Plan</span>
                                </Link>

                                <Link to="/dash/stocks" className="b mx-auto h-16 w-64 flex justify-center items-center">
                                    <div className="i h-20 w-64 bg-gradient-to-br from-yellow-600 to-orange-400 items-center rounded-xl shadow-xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                                    </div>
                                    <span className="text-center text-white font-semibold z-10 pointer-events-none">Stock Check</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )

    return content
}
export default Dashboard