import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: {
            name: false,
            email: false,
            password: false,
            secondTry: false
        },
    },
    reducers: {
        setUser: (state, action) => {state, state.user = action.payload},
        setUserError: (state, action) => {state, state.error = action.payload},
        clearUser: () => null
    }
});


export const { setUser, setUserError,  clearUser} = userSlice.actions;

export default userSlice.reducer;