const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: {
        status: 'all',
        entities: []
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_ADD_NEW_HERO': {
            const newArr = [...state.heroes];
            newArr.push(action.payload);

            return {
                ...state,
                heroes: newArr
            }
        }
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE_HERO':
            return {
                ...state,
                heroes: state.heroes.filter(hero => {
                    return hero.id !== action.payload
                })
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    entities: action.payload
                }
            }
        case 'FILTERS_FILTER_CHANGED':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }
        default: return state
    }
}

export default reducer;