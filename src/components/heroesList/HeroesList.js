import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { createSelector } from 'reselect';

import {
    fetchHeroes,
    heroesDeleteHero
} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const filteredHeroes = useSelector(createSelector(
        state => state.filters.status,
        state => state.heroes.entities,
        (filterStatus, heroes) => heroes.filter(hero => (hero.element === filterStatus || filterStatus === 'all'))
    ))

    useEffect(() => {
        dispatch(fetchHeroes(request));

        // eslint-disable-next-line
    }, []);

    const onDeleteHero = useCallback((id) => {
        dispatch(heroesDeleteHero(id));
        request(`http://localhost:3001/heroes/${id}`, 'DELETE');
        // eslint-disable-next-line
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

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDeleteHero={() => onDeleteHero(id)}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;