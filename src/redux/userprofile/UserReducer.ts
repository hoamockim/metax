import { AnyAction, Reducer } from "redux"
import { AccountState } from "../RootState"
import { ACTIVEACOUNT, LOADING, SIGNFAIL, SIGNIN, SIGNINED, SIGNUP, SIGNUPDONE, WAITING } from "./UserAction"

const initialState: AccountState = {
    status: '',
    email: '',
    accessToken: ''
}

const UserReducer: Reducer<AccountState, AnyAction> = (state = initialState, action): AccountState => {
    switch (action.type) {
        case SIGNUP:
            return {...state, status: LOADING}
        case SIGNUPDONE:
            return {... state, status: action.payload.status, email: action.payload.email}
        case SIGNIN:
            return {...state, status: WAITING}
        case SIGNINED:
            return {...state, status: SIGNINED, accessToken: action.payload.accessToken}
        case SIGNFAIL:
            return {...state, status: SIGNFAIL}
        case ACTIVEACOUNT:
            return {...state, status: WAITING}
        default:
            return {...state}
    }
}

export default UserReducer