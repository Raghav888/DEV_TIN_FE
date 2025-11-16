import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            return state.filter(feed => feed._id !== action.payload);
        },
        removeFeeds: (state, action) => {
            return null;
        }
    }
});

export const { addFeed, removeFeed, removeFeeds } = feedSlice.actions;
export default feedSlice.reducer;