export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleteHero = (id) => {
    return {
        type: 'HEROES_DELETE_HERO',
        payload: id
    }
}

export const heroesAddNewHero = (hero) => {
    return {
        type: 'HEROES_ADD_NEW_HERO',
        payload: hero
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filterChanged = (status) => {
    return {
        type: 'FILTERS_FILTER_CHANGED',
        payload: status
    }
}