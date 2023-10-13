import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    entities: [],
    heroesLoadingStatus: 'idle'
};

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
            state.entities.push(action.payload);
        },
        heroesDeleteHero: (state, action) => {
            state.entities = state.entities.filter(hero => {
                return hero.id !== action.payload
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.entities = action.payload;
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

export default heroesSlice.reducer;