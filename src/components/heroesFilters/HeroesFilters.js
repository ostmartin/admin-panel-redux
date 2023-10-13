import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    filterChanged
} from "./filtersSlice";
import { fetchFilters } from "../../actions";
import { useHttp } from '../../hooks/http.hook';

const HeroesFilters = () => {
    const { status, entities } = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, []);

    const onFilterChange = (newStatus) => {
        dispatch(filterChanged(newStatus))
    }

    const filters = entities.map(filterData => {
        const { id, className, filterValue, filter } = filterData;

        const modifiedClassName = status === filterValue ? (className + ' active') : className; 

        return <button
            key={id}
            data-status={filterValue}
            className={`btn ${modifiedClassName}`}
            onClick={() => onFilterChange(filterValue)}
        >
            {filter}
        </button>
    })

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;