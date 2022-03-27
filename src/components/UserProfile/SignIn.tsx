import { red } from "@material-ui/core/colors"
import { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dispatch } from "redux"
import { createSelector, Selector } from "reselect"
import { AccountState, RootState } from "../../redux/RootState"
import { SignInAction, SIGNINED } from "../../redux/userprofile/UserAction"
import StringUtil from "../../utils/strings"

const googleImage = require('../../asserts/images/icons/icon-google.png')

type SignInPropType = {
    account: AccountState
    signIn: (email: string, password: string) => void
}

const accountSelector = (state:RootState): AccountState => state.account
const getAccountStatus: Selector<RootState, AccountState> = createSelector(accountSelector, (accountState: AccountState): AccountState => accountState)
const mapStateToProps =(state: RootState) => ({
    account: getAccountStatus(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signIn: (email: string, password: string)=> dispatch(SignInAction(email, password)),
    }
}

const styles = {
    error: {
       color: "red",
    }
}

const SignIn: FC<SignInPropType> = (props): ReactElement => {
    const fb = `${process.env.REACT_APP_FACEBOOK_AUTH}&redirect_uri=${process.env.REACT_APP_AUTH_URL}/facebook/redirect&scope=email&client_id=${process.env.REACT_APP_FACEBOOKID}`
    const google = `${process.env.REACT_APP_GOOGLE_AUTH}&redirect_uri=${process.env.REACT_APP_AUTH_URL}/google/redirect&scope=email profile&client_id=${process.env.REACT_APP_GOOGLE_ID}`
    const [siginInfo, setSignUpInfo] = useState({
        valid: true,
        email: 'enter your email',
        password: 'enter your password',
    })
    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSignUpInfo((preState) => {
            return {...preState, email: e.target.value}
        })
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSignUpInfo((preState) => {
            return {...preState, password: e.target.value}
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!StringUtil.isValidEmail(siginInfo.email) || !StringUtil.isValidPassWord(siginInfo.password)) {
            setSignUpInfo((preState) => {
                return {...preState, valid: false}
            })
           return
        }
        props.signIn(siginInfo.email, siginInfo.password)
    }

    const [cookies, setCookie] = useCookies(['token'])
    useEffect(()=> {
        if (props.account.status==SIGNINED) {
            setCookie('token', props.account.accessToken)
            window.location.reload()
        }
    })
    const showError = ()=>{
        if (!siginInfo.valid){
            return <p style={styles.error}>Information is invallid</p>
        }
    }
    return(
        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
             {showError()}
            <form method="post" onSubmit={handleSubmit} className="login100-form validate-form flex-sb flex-w">
                <a href={fb} className="btn-face m-b-20">
                    <i className="fa fa-facebook-official"></i>
                Fabook</a>
                <a href={google} className = "btn-google m-b-20">
                    <img src={googleImage} alt= "GOOGLE"/>
                Google
                </a>

                <div className="p-t-31 p-b-9">
                    <span className="txt1">
                        Email
                    </span>
                </div>

                <div className="wrap-input100 validate-input">
                    <input type="text" className="input100" name="email" placeholder= {siginInfo.email} onChange= {changeEmail} required />
                    <span className="focus-input100"></span>
                </div>

                <div className="p-t-13 p-b-9">
                    <span className="txt1">
                        Password
                    </span>
                </div>
                <div className="wrap-input100 validate-input">
                    <input type="password" className="input100" name="pass" placeholder= {siginInfo.password} onChange= {changePassword} required />
                    <span className="focus-input100"></span>
                </div>
                <div className="container-login100-form-btn m-t-17">
                    <input type="submit"  className="login100-form-btn" value="Login"/>
                </div>

                <div className="w-full text-center p-t-55">
                    <span className="txt2">
                        Not a member?
                    </span>

                    <a href="/sign-up" className="txt2 bo1">
                        Sign up now
                    </a>
                </div>
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)