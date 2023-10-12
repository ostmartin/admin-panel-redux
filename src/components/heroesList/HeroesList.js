import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleteHero
} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { useCallback } from 'react';

const HeroesList = () => {
    const {entities, heroesLoadingStatus } = useSelector(state => state.heroes, shallowEqual);
    const status = useSelector(state => state.filters.status, shallowEqual)
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDeleteHero = useCallback((id) => {
        dispatch(heroesDeleteHero(id));
        request(`http://localhost:3001/heroes/${id}`, 'DELETE');

    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        const filteredHeroes = arr.filter(hero => (hero.element === status || status === 'all'))

        return filteredHeroes.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDeleteHero={() => onDeleteHero(id)}/>
        })
    }

    const elements = renderHeroesList(entities);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;