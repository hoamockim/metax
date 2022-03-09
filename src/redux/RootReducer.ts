import { combineReducers, Reducer } from "redux"
import UserStatisticReducer from "./userprofile/UserStatisticReducer"
import UserReducer from "./userprofile/UserReducer"

const RootReducer: Reducer = combineReducers({
    account: UserReducer,
    statistic: UserStatisticReducer 
})

export default RootReducer