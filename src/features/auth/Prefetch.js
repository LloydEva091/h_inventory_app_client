import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { stocksApiSlice } from '../stocks/stocksApiSlice';
import { recipesApiSlice } from '../recipes/recipesApiSlice';
import { menusApiSlice } from '../menus/menusApiSlice';
import { weeklyMenusApiSlice } from '../weekly/weeklyMenusApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const stocks = store.dispatch(stocksApiSlice.endpoints.getStocks.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const recipes = store.dispatch(recipesApiSlice.endpoints.getRecipes.initiate())
        const menus = store.dispatch(menusApiSlice.endpoints.getMenus.initiate())
        const weeklyMenus = store.dispatch(weeklyMenusApiSlice.endpoints.getWeeklyMenus.initiate())


        return () => {
            console.log('unsubscribing')
            stocks.unsubscribe()
            users.unsubscribe()
            recipes.unsubscribe()
            menus.unsubscribe()
            weeklyMenus.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
