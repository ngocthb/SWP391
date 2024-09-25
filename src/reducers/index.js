import {combineReducers} from "redux";
import collapseReducer from "./Collapse";

const allReducers = combineReducers({
    collapseReducer,
});

export default allReducers;