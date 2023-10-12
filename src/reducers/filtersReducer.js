const initialState = {
    status: 'all',
    entities: []
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                entities: action.payload
            }
        case 'FILTERS_FILTER_CHANGED':
            return {
                ...state,
                status: action.payload
            }
        default: return state
    }
}

export default filtersReducer;