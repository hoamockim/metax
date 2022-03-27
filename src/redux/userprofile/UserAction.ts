import { ActionCreator, AnyAction } from "redux"

export const SIGNUP = "signup"
export const SIGNUPDONE = "signup_done"
export const SIGNIN = "signin"
export const SIGNINED = "signined"
export const SIGNOUT = "signout"
export const SIGNFAIL ="signfail"
export const AUTHVIA3RD = "authen_3rd"
export const LOADING = "Loading"
export const STATISTIC ="statistic"
export const WAITING = "Waiting"
export const WAITINGACTIVE= "waiting active"
export const ERROR ="error"
export const SIGNOUTED = "signouted"
export const PAGELOAD = "page-load"
export const ACTIVED ="actived"
export const CHANGEPASSWORD ="change-password"
export const CHANGEDPASSWORD = "password-changed"
export const CHANGEDPASSWORDFAIL = "password-changed-not-successful"
export const ACTIVEACOUNT = "active-account"
export const ACTIVEDACCOUNT = "account-actived"

export enum AuthenType {
    Email,
    Facebook,
    Google
}

export const SignUpLocal: ActionCreator<AnyAction> = (email: string, password: string): AnyAction => {
    return {
        type: SIGNUP,
        payload: {email, password},
    }
}

export const Authen3RDAction: ActionCreator<AnyAction> =(authenType: AuthenType): AnyAction => {
    return {
        type: AUTHVIA3RD,
        authType: authenType
    }
}

export const SignInAction: ActionCreator<AnyAction> = (email: string, password: string): AnyAction => {
    return {
        type: SIGNIN,
        payload: {email, password},
    }
}

export const changePasswordAction: ActionCreator<AnyAction> = (oldPass: string, newpass: string, renewPass: string) => {
    return {
        type: CHANGEPASSWORD,
        payload :  {oldPass, newpass, renewPass}
    }
}

export const ActiveAccountAction: ActionCreator<AnyAction> = (userCode: string, activeCode: string): AnyAction => {
    return {
        type: ACTIVEACOUNT,
        payload: {userCode, activeCode},
    }
}

export const ActionLoadPage: ActionCreator<AnyAction> = (init: boolean): AnyAction =>{
    return {
        type: PAGELOAD,
        payload: {init}
    }
}