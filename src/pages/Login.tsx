import { FC, ReactElement } from "react"
import SignIn from "../components/UserProfile/SignIn"
import SignUp from "../components/UserProfile/SignUp"
import { LoginType } from "./PropPageType"

const LoginPage: FC<LoginType> = (props): ReactElement => {
    return (
        <>
        {
            props.currentState === 1 ? <SignIn /> :  <SignUp/>
        }
        </>
    )
}

export default LoginPage