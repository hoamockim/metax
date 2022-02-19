import { injectable} from "inversify"
import "reflect-metadata"
import StringUtil from "../../utils/strings"
import Restful, { SUCCESS } from "../Restful"
import IAccountService from "./IAccountService"

@injectable()
export default class AccountService implements IAccountService {
   signInGoogle() {
    const url = process.env.APP_PORT + "/google"
    return Restful.post(url, {
      requestId: StringUtil.generateRandom(20),
      data: {}
    })
  }

 
  signOut(): void {
    //clear token
    // redirect to login page
  }
 
  signIn(email: string, password: string) {
    const url = "http://localhost:8081/metax/v1/auth/signin"
    return Restful.post(url, {
      requestId: StringUtil.generateRandom(20),
      data: {
        email: email,
        password: password,
      }
    })
  }

  signUp(email: string, password: string) {
    const url = process.env.APP_PORT + "/signup"
    return Restful.post(url, {
      requestId: StringUtil.generateRandom(20),
      data: {
        email: email,
        password: password,
      }
    }) 
  }
}
  
