import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilters, filterChanged, selectAll } from "./filtersSlice";
import store from '../../store/index';

const HeroesFilters = () => {
    const filtersEntities = selectAll(store.getState());
    const status = useSelector(state => state.filters.status);
    const loadingStatus = useSelector(state => state.filters.loadingStatus);
    const dispatch = useDispatch();

    const filters = filtersEntities.map(filterData => {
        if (loadingStatus === 'error') {
            return <div>Ошибка загрузки</div>
        }

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

    useEffect(() => {
        dispatch(fetchFilters());

        // eslint-disable-next-line
    }, []);

    const onFilterChange = (newStatus) => {
        dispatch(filterChanged(newStatus))
    }

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