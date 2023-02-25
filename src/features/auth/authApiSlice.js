import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Login endpoint, Use a query to send a POST request to the /api/auth route in the backend with the body containing the credentials
        login: builder.mutation({
            query: credentials => ({
                url: '/api/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        // Send a post request to the api/auth/logout endpoint to logout 
        sendLogout: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
            }),
            // Using RTK query onQueryStarted, Check the query is fulfilled and dispath the logout reducer and clear the cache and the query subscription using the util.resetApiState 
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    // Allow the dispatch to realize the stock/user list been unmounted and then it can reset the api state and remove the subscription
                    setTimeout(()=>{
                        dispatch(apiSlice.util.resetApiState())
                    },1000)
                   
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 