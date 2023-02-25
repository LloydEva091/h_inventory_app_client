import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    // On login get token from payload and set it to the state token
    // On logout set state token to null
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

// Export the function 
export const { setCredentials, logOut } = authSlice.actions

// Export the authSlice reducer to be added to the store
export default authSlice.reducer

// Export a selector to select current token
export const selectCurrentToken = (state) => state.auth.token