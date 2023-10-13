import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: [],
    heroesLoadingStatus: 'idle'
};

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: (state) => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetched:  (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.entities = action.payload;
        },
        heroesFetchingError: (state) => {
            state.heroesLoadingStatus = 'error';
        },
        heroesAddNewHero: (state, action) => {
            state.entities.push(action.payload);
        },
        heroesDeleteHero: (state, action) => {
            state.entities = state.entities.filter(hero => {
                return hero.id !== action.payload
            })
        }
    }
})

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAddNewHero,
    heroesDeleteHero
} = heroesSlice.actions;

export default heroesSlice.reducer;