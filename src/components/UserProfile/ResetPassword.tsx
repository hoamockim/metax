import { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createSelector, Selector } from "reselect"
import { AccountState, RootState } from "../../redux/RootState"
import { changePasswordAction } from "../../redux/userprofile/UserAction"

const background = require('../../asserts/images/bg02.jpg')
const styles = {
    container: {
        backgroundImage:` url(${background})`,
    }
}
type ChangePasswordType = {
   status: string
   changePassword: (oldpass: string, newpass: string, renewpass: string) => void
}

const accountStateSelector = (state:RootState): AccountState => state.account
const getAccountStatus : Selector<RootState, string> = createSelector(accountStateSelector, (acountState: AccountState)=> acountState.status)

const mapStateToProps =(state: RootState) => ({
    status: getAccountStatus(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changePassword: (oldpass: string, newpass: string, renewpass: string) => dispatch(changePasswordAction(oldpass, newpass, renewpass))
    }
}

const ResetPassword: FC<ChangePasswordType> = (props): ReactElement => {
    const [info, setResetPassInfo] = useState({
        oldpass: '',
        newpass: '',
        renewpass: '',
    })
    
    const setOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setResetPassInfo((preState) => {
            return {...preState, oldpass: e.target.value}
        })
    }

    const setNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setResetPassInfo((preState) => {
            return {...preState, newpass: e.target.value}
        })
    }

    const setRetypeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setResetPassInfo((preState) => {
            return {...preState, renewpass: e.target.value}
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        props.changePassword(info.oldpass, info.newpass, info.renewpass)
    }

    const renderElement = () => {
        if (props.status=='SUCCESS') {
            return <div><h2>Change password success, please click</h2><a href="/">the link</a> to back the system </div>
        }else {
        return <form method="post" onSubmit={handleSubmit} className="login100-form validate-form flex-sb flex-w">
                <div className="p-t-31 p-b-9">
                    <span className="txt1">
                        Current password
                    </span>
                </div>

                <div className="wrap-input100 validate-input">
                    <input type="password" className="input100" name="oldpass" placeholder= {info.oldpass} onChange= {setOldPassword} required />
                    <span className="focus-input100"></span>
                </div>

                <div className="p-t-31 p-b-9">
                    <span className="txt1">
                        New password
                    </span>
                </div>

                <div className="wrap-input100 validate-input">
                    <input type="password" className="input100" name="newpass" placeholder= {info.newpass} onChange= {setNewPassword} required />
                    <span className="focus-input100"></span>
                </div>

                <div className="p-t-31 p-b-9">
                    <span className="txt1">
                      Retype New password
                    </span>
                </div>

                <div className="wrap-input100 validate-input">
                    <input type="password" className="input100" name="newpass" placeholder= {info.renewpass} onChange= {setRetypeNewPassword} required />
                    <span className="focus-input100"></span>
                </div>

                <div className="container-login100-form-btn m-t-17">
                    <input type="submit" className="login100-form-btn" value="Change password   "/>
                </div>
            </form>
        }
    }
    return(
        <div className="limiter">
        <div className="container-login100" style={styles.container}>
        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
        {
            renderElement()
        }
       </div></div></div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)