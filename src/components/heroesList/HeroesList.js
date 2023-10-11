import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleteHero
} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus } = useSelector(state => state);
    const status = useSelector(state => state.filters.status)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDeleteHero = (id) => {
        dispatch(heroesDeleteHero(id));
        request(`http://localhost:3001/heroes/${id}`, 'DELETE');

    }

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

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;