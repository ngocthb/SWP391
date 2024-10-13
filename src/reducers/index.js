import {combineReducers} from "redux";
import collapseReducer from "./Collapse";
import { updateBookingReducer, updateCustomerReducer, updateManagerReducer, updateServiceReducer, updateStaffReducer, updateStylistReducer, updateUserReducer, updateVoucherReducer } from "./Update";
import { setRoleReducer } from "./Role";

const allReducers = combineReducers({
    collapseReducer,
    updateUserReducer,
    updateStylistReducer,
    updateServiceReducer,
    updateVoucherReducer,
    updateCustomerReducer,
    updateStaffReducer,
    updateManagerReducer,
    updateBookingReducer,
    setRoleReducer,
});

export default allReducers;