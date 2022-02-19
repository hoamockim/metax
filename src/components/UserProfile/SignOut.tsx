import { FC, ReactElement } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { SignOutAction } from "../../redux/userprofile/UserAction"

type SignOutPropType = {
    type: number // 0: email, 1: facebook, 2: google
    email: string
    password: string
    register: () => void
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        register: ()=> dispatch(SignOutAction())
    }
}

const signOutHandler =  (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault()
}

const SignOut: FC<SignOutPropType> = (props): ReactElement => {
    return(
        <button onClick={signOutHandler}  className="btn btn-primary btn-block btn-large" >Sign-out</button>
    )
}

export default connect(null, mapDispatchToProps)(SignOut)