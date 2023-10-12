import { combineReducers } from "redux";
import filtersReducer from "./filtersReducer";
import heroesReducer from "./heroesReducer";

const rootReducer = combineReducers({
    heroes: heroesReducer,
    filters: filtersReducer
});

export default rootReducer;