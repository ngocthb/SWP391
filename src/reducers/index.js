import {combineReducers} from "redux";
import collapseReducer from "./Collapse";
import { updateStylistReducer, updateUserReducer } from "./Update";

const allReducers = combineReducers({
    collapseReducer,
    updateUserReducer,
    updateStylistReducer,
});

export default allReducers;