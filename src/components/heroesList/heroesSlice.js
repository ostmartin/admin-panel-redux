import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const request = useHttp();
        return request("http://localhost:3001/heroes");
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesAddNewHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload);
        },
        heroesDeleteHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    }
})

export const {
    heroesAddNewHero,
    heroesDeleteHero
} = heroesSlice.actions;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroes = createSelector(
    state => state.filters.status,
    selectAll,
    (filterStatus, heroes) => heroes.filter(hero => (hero.element === filterStatus || filterStatus === 'all'))
);

export default heroesSlice.reducer;