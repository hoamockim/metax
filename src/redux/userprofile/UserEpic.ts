import { AnyAction } from "redux"
import { Epic, ofType } from "redux-observable"
import { map, switchMap } from "rxjs"
import ioc, { IocType } from "../../ioc"
import { IAccountService } from "../../services/account"
import { ResponseData, SUCCESS } from "../../services/Restful"
import { AccountState } from "../RootState"
import * as ac from "./UserAction"

export type UserEpic = Epic<AnyAction, AnyAction, AccountState>
const accountService: IAccountService = ioc.get<IAccountService>(IocType.AuthenService)
 
const signUp: UserEpic =  action$ => action$.pipe(
    ofType(ac.SIGNUP),
    map(action => ({type: ac.SIGNUP, payload: action.payload})),
    switchMap(action => 
        accountService.signUp(action.payload.email, action.payload.password).pipe(
            map(value => {
                const response = value.data as ResponseData
                if (response.code != SUCCESS) {
                    return {type: ac.SIGNFAIL, payload: response.message}
                 }
                return {type: ac.SIGNUPDONE, payload: {email: response.data.email, status: response.data.register_status}}
            })
)))

const signIn: UserEpic = action$ => action$.pipe(
    ofType(ac.SIGNIN),
    map(action => ({type: ac.SIGNIN, payload: action.payload})),
    switchMap(action =>
        accountService.signIn(action.payload.email, action.payload.password).pipe(
            map(value => {
                 const response = value.data as ResponseData
                 if (response.code != SUCCESS) {
                    return {type: ac.SIGNFAIL, payload: response.message}
                 }
                return {type: ac.SIGNINED, payload: response.data}
            })
)))

const changePassword: UserEpic = action$ => action$.pipe(
    ofType(ac.CHANGEPASSWORD),
    map(action => ({type: ac.CHANGEPASSWORD, payload: action.payload})),
    switchMap(action =>
        accountService.changePassword(action.payload.oldPass, action.payload.newpass, action.payload.renewPass).pipe(
            map(value => {
                const response = value.data as ResponseData
                return {type: ac.CHANGEDPASSWORD, payload: response.data}
            })
)))

const activeAccount: UserEpic = action$ => action$.pipe(
    ofType(ac.ACTIVEACOUNT),
    map(action => ({type: ac.ACTIVEACOUNT, payload: action.payload})),
    switchMap(action => 
        {
            return accountService.activeAccount(action.payload.userCode, action.payload.activeCode).pipe(
                map(value => {
                    const response = value.data as ResponseData
                    return {type: ac.ACTIVEDACCOUNT, payload: response.data}
                })
            )
        }
))

const statistic: UserEpic = action$ => action$.pipe(
    ofType(ac.PAGELOAD),
    map(action => {
        return ({type: ac.PAGELOAD, payload: action.payload})
    }),
    switchMap(action => 
        accountService.statistic(action.payload.init as boolean).pipe(
            map(value => {
                const response = value.data as ResponseData
                return {type: ac.STATISTIC, payload: response.data}
        })
)))

export {signUp, signIn, statistic, changePassword, activeAccount}