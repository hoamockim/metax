import { combineReducers, Reducer } from "redux";
import UserReducer from "./userprofile/UserReducer";

const RootReducer: Reducer = combineReducers({
    account: UserReducer
})

export default RootReducer