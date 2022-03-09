import { AnyAction, Reducer } from "redux"
import { StatisticState } from "../RootState"

const initStatisticState: StatisticState = {
    signedup: 0,
    activeInDay: 0,
    active7DaysRolling: 0
}

const StatisticReducer: Reducer<StatisticState, AnyAction> = (state = initStatisticState, action): StatisticState => { 
    switch(action.type) {
        default:
            return {...state}
    }
}

export default StatisticReducer