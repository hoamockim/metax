import { AnyAction, Reducer } from "redux"
import { StatisticState } from "../RootState"
import { PAGELOAD, STATISTIC } from "./UserAction"

const initStatisticState: StatisticState = {
  active7DaysRolling:0,
  activeInDay: 0,
  signedup: 0,
  signinCounter: 0,
  lastTimeSignin: 0
}

const UserStatisticReducer: Reducer<StatisticState, AnyAction> = (state = initStatisticState, action): StatisticState => { 
    switch(action.type) {
        case PAGELOAD:
          return {...state}
        case STATISTIC:
          if (action.payload.personal) {
            return {...state, 
              signinCounter: action.payload.personal.signincounter, 
              lastTimeSignin: action.payload.personal.lastedsignin,
              active7DaysRolling: action.payload.total.ActiveIn7Day,
              activeInDay: action.payload.total.ActivedInDay,
              signedup: action.payload.total.SignUp
            }
          }
          return {...state, 
            active7DaysRolling: action.payload.total.ActiveIn7Day,
            activeInDay: action.payload.total.ActivedInDay,
            signedup: action.payload.total.SignUp
          }
        default:
            return {...state}
    }
}

export default UserStatisticReducer