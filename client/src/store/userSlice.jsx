import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        allUsers: [null],
        error: {
            name: false,
            email: false,
            password: false,
            secondTry: false
        },
    },
    reducers: {
        setUser: (state, action) => {state, state.user = action.payload},
        setAllUsers: (state, action) => {state, state.allUsers = action.payload},
        setUserError: (state, action) => {state, state.error = action.payload},
        clearUser: (state, action) => {state, state.user = action.payload},
    }
});


export const { setUser, setAllUsers,  setUserError,  clearUser} = userSlice.actions;

export default userSlice.reducer;