import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    isLogged: boolean
}

const initialState: AuthState = {
    isLogged: JSON.parse(localStorage.getItem('isLogged') || 'false'),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload
            localStorage.setItem('isLogged', JSON.stringify(action.payload))
        },
        setIsLoggedOut: (state) => {
            state.isLogged = false
            localStorage.setItem('isLogged', 'false')
        },
    },
})

export const { setIsLogged, setIsLoggedOut } = authSlice.actions

export default authSlice.reducer
