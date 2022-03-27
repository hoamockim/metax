import { AnyAction, Reducer } from "redux"
import { AccountState } from "../RootState"
import { ACTIVEACOUNT, ACTIVED, ACTIVEDACCOUNT, CHANGEDPASSWORD, CHANGEDPASSWORDFAIL, LOADING, SIGNFAIL, SIGNIN, SIGNINED, SIGNUP, SIGNUPDONE, WAITING } from "./UserAction"

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
        case ACTIVEDACCOUNT:
            return {...state, status: ACTIVED}
        case CHANGEDPASSWORD:
            return {...state, status: CHANGEDPASSWORD}
        case CHANGEDPASSWORDFAIL:
            return {...state, status: CHANGEDPASSWORDFAIL}
        default:
            return {...state}
    }
}

export default UserReducer