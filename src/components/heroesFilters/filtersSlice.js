import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'all',
    entities: []
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetched: (state, action) => {
            state.entities = action.payload;
        },
        filterChanged: (state, action) => {
            state.status = action.payload;
        }
    }
})

export const {
    filtersFetched,
    filterChanged
} = filtersSlice.actions;

export default filtersSlice.reducer;