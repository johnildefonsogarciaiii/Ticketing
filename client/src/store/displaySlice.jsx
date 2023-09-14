import { createSlice } from "@reduxjs/toolkit";


const dispaySlice = createSlice({
    name: "display",
    initialState: {
        loader: false,
        visible: false,
        signup: false
    },
    reducers: {
        isLoading: (state, action) => {state, state.loader = action.payload},
        isVisible: (state, action) => {state, state.visible = action.payload},
        isSignup: (state, action) => {state, state.signup = action.payload}
    }
});


export const { isLoading, isVisible, isSignup} = dispaySlice.actions;

export default dispaySlice.reducer;