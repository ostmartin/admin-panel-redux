const initialState = {
    entities: [],
    heroesLoadingStatus: 'idle'
}

const heroesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_ADD_NEW_HERO': {
            const newArr = [...state.entities];
            newArr.push(action.payload);

            return {
                ...state,
                entities: newArr
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
                entities: action.payload,
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
                entities: state.entities.filter(hero => {
                    return hero.id !== action.payload
                })
            }
        default: return state
    }
}

export default heroesReducer;