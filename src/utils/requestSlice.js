import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            return state.filter(request => request._id !== action.payload);
        },
        removeRequests: (state, action) => {
            return null;
        }
    }
});

export const { addRequests, removeRequest, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;