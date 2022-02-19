import { Container } from "inversify"
import "reflect-metadata";
import { AccountService, IAccountService } from "./services/account"

/**
 * register denpendency
 * @param container 
 */

export const IocType = {
    AuthenService: Symbol("AuthenService")
}

const DependencyRegister = (container: Container) => {
    container.bind<IAccountService>(IocType.AuthenService).to(AccountService)
}

const ioc = new Container({defaultScope: "Singleton", autoBindInjectable: true})

DependencyRegister(ioc)

export default ioc 