import {combineReducers} from "redux";
import collapseReducer from "./Collapse";
import updateUserReducer from "./UpdateUser";

const allReducers = combineReducers({
    collapseReducer,
    updateUserReducer,
});

export default allReducers;