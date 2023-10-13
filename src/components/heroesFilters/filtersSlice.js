import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const initialState = {
    status: 'all',
    loadingStatus: 'idle',
    entities: []
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const request = useHttp();
        return request("http://localhost:3001/filters");
    }
)

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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.loadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.loadingStatus = 'idle';
                state.entities = action.payload;
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.loadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

export const {
    filtersFetched,
    filterChanged
} = filtersSlice.actions;

export default filtersSlice.reducer;