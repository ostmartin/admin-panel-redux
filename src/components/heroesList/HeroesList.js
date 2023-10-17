import {  useCallback, useMemo } from 'react';
import {  useSelector } from 'react-redux';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";

import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filterStatus = useSelector(state => state.filters.status);
    
    const {
        data: heroes = [],
        isError,
        isLoading
    } = useGetHeroesQuery();

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (filterStatus === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === filterStatus);
        }
    }, [heroes, filterStatus]);

    const [deleteHero] = useDeleteHeroMutation();

    const onDeleteHero = useCallback((id) => {
        deleteHero(id);
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
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