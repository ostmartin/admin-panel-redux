import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    status: 'all',
    loadingStatus: 'idle'
})

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
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.loadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersFetched,
    filterChanged
} = filtersSlice.actions;

export default filtersSlice.reducer;