// creates a Redux store using configureStore() from @reduxjs/toolkit. 
// The store's reducer is composed of two parts: the reducer from apiSlice and the authReducer from ../features/auth/authSlice. getDefaultMiddleware() is called to get the default middleware stack that includes thunk, immutableCheck, and serializableCheck. apiSlice.middleware is then concatenated to the middleware stack.
// Lastly, setupListeners(store.dispatch) is called to automatically subscribe to the API endpoints defined in apiSlice.
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
