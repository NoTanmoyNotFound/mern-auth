import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state) => {
            state.loading = false;
            state.error = true;
        }

    }
})
export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer