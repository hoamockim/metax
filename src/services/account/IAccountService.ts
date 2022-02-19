import { AxiosObservable } from "axios-observable"
import { AuthType } from "./Model"


export default interface IAccountService {
    signUp(email: string, password: string): AxiosObservable<any>
    signIn(email: string, password: string): AxiosObservable<any>
   // signInFacebook(code: string) : Promise<any>
    signInGoogle():  AxiosObservable<any>
    signOut():void
}