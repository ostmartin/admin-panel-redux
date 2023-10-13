import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from "../reducers/filtersReducer";
import heroesReducer from "../reducers/heroesReducer";

const requestGET = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}`);
        }

        return data;
    } catch (error) {
        throw error
    }
}
// eslint-disable-next-line
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const dispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            requestGET("http://localhost:3001/filters")
                .then(console.log)
                // .catch(console.log);

            return dispatch({
                type: action
            })
        }
        return dispatch(action)
    }

    return store;
}
const store = configureStore({
    reducer: {
        heroes: heroesReducer,
        filters: filtersReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store;