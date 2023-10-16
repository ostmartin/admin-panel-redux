import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesDeleteHero, fetchHeroes, filteredHeroes } from './heroesSlice';
import { useHttp } from '../../hooks/http.hook';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const request = useHttp();

    const filtered = useSelector(filteredHeroes);

    useEffect(() => {
        dispatch(fetchHeroes());

        // eslint-disable-next-line
    }, []);

    const onDeleteHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(heroesDeleteHero(id)));
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

    const elements = renderHeroesList(filtered);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;