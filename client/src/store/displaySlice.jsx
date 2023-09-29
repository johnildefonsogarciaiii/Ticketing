import { createSlice } from "@reduxjs/toolkit";


const dispaySlice = createSlice({
    name: "display",
    initialState: {
        loader: false,
        visible: false,
        signup: false,
        success: false,
        created: false,
        updated: false,
        error: false
    },
    reducers: {
        isLoading: (state, action) => {state, state.loader = action.payload},
        isVisible: (state, action) => {state, state.visible = action.payload},
        isSignup: (state, action) => {state, state.signup = action.payload},
        isSuccess: (state, action) => {state, state.success = action.payload},
        isError: (state, action) => {state, state.error = action.payload},
        isCreated: (state, action) => {state, state.created = action.payload},
        isUpdated: (state, action) => {state, state.updated = action.payload},
    }
});


export const { isLoading, isVisible, isSignup, isSuccess, isError, isCreated, isUpdated} = dispaySlice.actions;

export default dispaySlice.reducer;