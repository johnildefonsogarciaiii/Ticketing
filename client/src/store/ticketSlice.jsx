import { createSlice } from '@reduxjs/toolkit';


const ticketSlice = createSlice({
    name: "ticket",
    initialState: {
        ticket: []
    },
    reducers: {
        setTickets: (state, action) => {state, state.ticket = action.payload},
        clearTickets: (state, action) => {state, state.ticket = action.payload},
    }
})


export const { setTickets, clearTickets} = ticketSlice.actions;

export default ticketSlice.reducer;