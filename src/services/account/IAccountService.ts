import { AxiosObservable } from "axios-observable"

export default interface IAccountService {
    signUp(email: string, password: string): AxiosObservable<any>
    signIn(email: string, password: string): AxiosObservable<any>
    changePassword(oldPass: string, newpass: string, renewPass: string):  AxiosObservable<any>
    activeAccount(userCode: string, activeCode: string):  AxiosObservable<any>
    statistic(init: boolean):  AxiosObservable<any>
}