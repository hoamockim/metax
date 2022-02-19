import { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createSelector, Selector } from "reselect"
import { AccountState, RootState } from "../../redux/RootState"
import { SignInAction, SIGNINED } from "../../redux/userprofile/UserAction"
import StringUtil from "../../utils/strings"

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
    size: {
        height: "50px",
        width: "80px"
    }
}

const SignIn: FC<SignInPropType> = (props): ReactElement => {
    const [siginInfo, setSignUpInfo] = useState({
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
            //TODO: show error
        }
        props.signIn(siginInfo.email, siginInfo.password)
    }

    const [cookies, setCookie] = useCookies(['token'])
    useEffect(()=> {
        if (props.account.status==SIGNINED) {
            console.log(props.account.accessToken)
            setCookie('token', props.account.accessToken)
        }
    })

    return(
        <div className="signin">
            <h1>Sign In With</h1>
            <form method="post" onSubmit={handleSubmit}>
                <a href="https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=http://localhost:8081/metax/v1/auth/facebook/redirect&scope=email&client_id=5021526877930448">Fabook login</a>
                <input type="text" name="email" placeholder= {siginInfo.email} onChange= {changeEmail} required />
                <input type="password" name="pass" placeholder= {siginInfo.password} onChange= {changePassword} required />
                <input type="submit"  className="btn btn-primary btn-block btn-large" value="Login"/>
            </form>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)