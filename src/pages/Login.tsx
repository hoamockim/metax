import { FC, ReactElement } from "react"
import ActiveAccount from "../components/UserProfile/Active"
import ResetPassword from "../components/UserProfile/ResetPassword"
import SignIn from "../components/UserProfile/SignIn"
import SignUp from "../components/UserProfile/SignUp"
import { LoginType } from "./PropPageType"

const LoginPage: FC<LoginType> = (props): ReactElement => {
    return (
        <>
        {
            props.currentState === 1 ? <SignIn /> : 
            props.currentState == 2 ? <SignUp/> : 
            props.currentState == 3 ?<ActiveAccount/> : <ResetPassword/>
        }
        </>
    )
}

export default LoginPage