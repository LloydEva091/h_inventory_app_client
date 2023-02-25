import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header className='flex justify-center'>
                <h1>Inventory Management App</h1>
            </header>
            <main className="public__main">
                <p className='flex justify-center'>Welcome to the Inventory Management App! Use this app to track and manage your inventory.</p>
                <div className='flex justify-center'>
                    <div className='block m-4'>
                        <Link to="/login" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Log in</Link>
                    </div>
                    <div className='block m-4'>
                        <Link to="/register" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign Up</Link>
                    </div>
                </div>
            </main>
            <footer className='flex flex-col'>

            </footer>
        </section>

    )
    return content
}
export default Public