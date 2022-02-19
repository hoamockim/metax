import { AnyAction, Reducer } from "redux"
import { AccountState } from "../RootState"
import { LOADING, SIGNIN, SIGNINED, SIGNINFACE, SIGNINGOOGLE, SIGNUP, SIGNUPDONE, WAITING } from "./UserAction"

const initialState: AccountState = {
    status: '',
    accountCode: '',
    email: 'kim@gmail.com',
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
        case SIGNINFACE:
            return {...state, status: SIGNINFACE }
        case SIGNINGOOGLE:
            return {...state, status: SIGNINGOOGLE}
        case SIGNINED:
            return {...state, status: SIGNINED, accessToken: action.payload.data.accessToken}
        default:
            return {...state}
    }
}

export default UserReducer