import { AxiosObservable } from "axios-observable"
import { injectable} from "inversify"
import "reflect-metadata"
import StringUtil from "../../utils/strings"
import Restful from "../Restful"
import IAccountService from "./IAccountService"

@injectable()
export default class AccountService implements IAccountService {
  signIn(email: string, password: string) {
    const url =  `${process.env.REACT_APP_AUTH_URL}/signin`
    console.log(url)
    return Restful.post(url, {
      requestId: StringUtil.generateRandom(20),
      email: email,
      password: password,
    })
  }

  signUp(email: string, password: string) {
    const url = `${process.env.REACT_APP_AUTH_URL}/signup`
    return Restful.post(url, {
      requestId: StringUtil.generateRandom(20),
      email: email,
      password: password,
    }) 
  }

  changePassword(oldPass: string, newpass: string, renewPass: string): AxiosObservable<any> {
    const url =`${process.env.REACT_APP_PROFILE_URL}/password/change`
    return Restful.patch(url, {
      requestId: StringUtil.generateRandom(20),
      oldpass: oldPass,
      newpass: newpass,
      renewpass: renewPass
    }) 
  }

  activeAccount(userCode: string, activeCode: string): AxiosObservable<any> {
    const url =`${process.env.REACT_APP_PROFILE_URL}/active`
    return Restful.patch(url, {
      requestId: StringUtil.generateRandom(20),
      userCode: userCode,
      activeCode: activeCode,
    }) 
  }
  statistic(init: boolean): AxiosObservable<any> {
    return Restful.get(`${process.env.REACT_APP_PROFILE_URL}/statistic?init=${init}`)
  }
}
  
