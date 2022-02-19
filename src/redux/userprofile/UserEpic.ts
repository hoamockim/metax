import { AnyAction } from "redux"
import { Epic, ofType } from "redux-observable"
import { delay, map, switchMap } from "rxjs"
import ioc, { IocType } from "../../ioc"
import { IAccountService } from "../../services/account"
import { AccountState } from "../RootState"
import { SIGNIN, SIGNINED, SIGNINGOOGLE, SIGNOUT, SIGNUP, SIGNUPDONE } from "./UserAction"

export type UserEpic = Epic<AnyAction, AnyAction, AccountState>
const accountService: IAccountService = ioc.get<IAccountService>(IocType.AuthenService)
 
const signUp: UserEpic =  action$ => action$.pipe(
    ofType(SIGNUP),
    map(action => ({type: SIGNUP, payload: action.payload})),
    delay(2000),
    switchMap(action => 
        accountService.signUp(action.payload.email, action.payload.password).pipe(
            map(res => ({type: SIGNUPDONE, payload: res}))
    ))
)
//accountService.signIn(action.payload.email, action.payload.password)
const signIn: UserEpic = action$ => action$.pipe(
    ofType(SIGNIN),
    map(action => ({type: SIGNUP, payload: action.payload})),
    switchMap(action =>
        accountService.signIn(action.payload.email, action.payload.password).pipe(
            map(res => ({type: SIGNINED, payload: res.data}))
        )
    )
)

const signInGoogle: UserEpic =  action$ => action$.pipe(
    ofType(SIGNINGOOGLE),
    delay(2000),
    switchMap(() => 
        accountService.signInGoogle().pipe(
            map(res => ({type: SIGNINED, payload: res}))
        )
    )
)

const signOut: UserEpic = action$ => action$.pipe(
    ofType(SIGNOUT),
    delay(1000),
    map(action => ({type: 'increment', payload: 2}))
)

export {signUp, signIn, signInGoogle, signOut}