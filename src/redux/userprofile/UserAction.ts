import { ActionCreator, AnyAction } from "redux"

export const SIGNUP = "signup"
export const SIGNUPDONE = "signup_done"
export const SIGNIN = "signin"
export const SIGNINFACE = "signinface"
export const SIGNINGOOGLE = "signingoole"
export const SIGNINED = "signined"
export const SIGNOUT = "signout"
export const AUTHVIA3RD = "authen_3rd"
export const LOADING = "Loading"
export const WAITING = "Waiting"
export const ERROR ="error"
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

export const SignInFacebookAction:  ActionCreator<AnyAction> = (code: string): AnyAction => {
    return {
        type: SIGNINFACE,
        payload: {code}
    }
}

export const SignInGoogleAction:  ActionCreator<AnyAction> = (): AnyAction => {
    return {
        type: SIGNINGOOGLE,
    }
}

export const SignOutAction: ActionCreator<AnyAction> = (): AnyAction => {
    return {
        type: SIGNOUT,
        payload: 1,
    }
}