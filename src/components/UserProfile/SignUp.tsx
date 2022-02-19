import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createSelector, Selector } from 'reselect'
import { AccountState, RootState } from "../../redux/RootState"
import { SignUpLocal } from "../../redux/userprofile/Index"
import StringUtil from "../../utils/strings"

type SignUpPropType = {
    state: string
    signUp: (email: string, password: string) => void
}

const accountSelector = (state:RootState): AccountState => state.account
const getAccountStatus: Selector<RootState, string> = createSelector(accountSelector, (accountState: AccountState): string => accountState.status)
const mapStateToProps =(state: RootState) => ({
    state: getAccountStatus(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signUp: (email: string, password: string)=> dispatch(SignUpLocal(email, password))
    }
}

const SignUp: FC<SignUpPropType> = (props): ReactElement => {
    const [signUpInfo, setSignUpInfo] = useState({
        email: 'enter your email',
        password: 'enter your password',
        registerType: 0,
    })

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setSignUpInfo((preState) => {
            return {...preState, email: e.target.value}
        })
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setSignUpInfo((preState) => {
            return {...preState, password: e.target.value}
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        if (!StringUtil.isValidEmail(signUpInfo.email) || !StringUtil.isValidPassWord(signUpInfo.password)) {
            //TODO: show error
        }
        props.signUp(signUpInfo.email, signUpInfo.password)
        e.preventDefault()
    }
    return(
        <div className="register">
            <h2>{props.state}</h2>
            <form method="post" onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder= {signUpInfo.email} onChange= {changeEmail} required />
                <input type="password" name="pass" placeholder= {signUpInfo.password} onChange= {changePassword} required />
                <input type="submit"  className="btn btn-primary btn-block btn-large" value="Register"/>
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)