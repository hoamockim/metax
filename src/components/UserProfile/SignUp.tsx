import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createSelector, Selector } from 'reselect'
import { AccountState, RootState } from "../../redux/RootState"
import { SignUpLocal } from "../../redux/userprofile/Index"
import { WAITINGACTIVE } from "../../redux/userprofile/UserAction"
import StringUtil from "../../utils/strings"

type SignUpPropType = {
    state: string
    signUp: (email: string, password: string) => void
}

const background = require('../../asserts/images/bg02.jpg')
const styles = {
    container: {
        backgroundImage:` url(${background})`,
    }
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
    const waitingShow = () => {
        const mailink = `mailto:${signUpInfo.email}`
        if (props.state == WAITINGACTIVE){
            return <p>Please go to <a href= {mailink}>email</a> to active the account</p>
        }
    }
    return(
        <div className="limiter">
        
            <div className="container-login100" style={styles.container}>
            <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                {waitingShow()}
                <form method="post" onSubmit={handleSubmit} className="login100-form validate-form flex-sb flex-w">
                    <div className="p-t-31 p-b-9">
                        <span className="txt1">
                            Email
                        </span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input type="text" className="input100" name="email" placeholder= {signUpInfo.email} onChange= {changeEmail} required />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="p-t-13 p-b-9">
                        <span className="txt1">
                            Password
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input">
                        <input type="password" className="input100" name="pass" placeholder= {signUpInfo.password} onChange= {changePassword} required />
                        <span className="focus-input100"></span>
                    </div>
                    <div className="container-login100-form-btn m-t-17">
                        <input type="submit" className="login100-form-btn" value="Register"/>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)