import { FC, ReactElement } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import { createSelector, Selector } from "reselect"
import { AccountState, RootState } from "../../redux/RootState"
import { ActiveAccounttAction } from "../../redux/userprofile/UserAction"

type ActiveAccountPropType = {
    state: string
    active:(usercode: string, activecode: string) => void
}

const accountStateSelector = (state:RootState): AccountState => state.account
const getAccountStatus : Selector<RootState, string> = createSelector(accountStateSelector, (accountUpdatedState: AccountState)=> accountUpdatedState.status)
const mapStateToProps =(state: RootState) => ({
    state: getAccountStatus(state)
})


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        active: (usercode: string, activecode: string)=> dispatch(ActiveAccounttAction(usercode, activecode)),
    }
}

const ActiveAccount: FC<ActiveAccountPropType> = (props): ReactElement=> {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const activeHandler =  (e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault()
        if (queryParams.has('userCode') && queryParams.get('userCode') !== "" && 
            queryParams.has('activeCode') && queryParams.get('activeCode') !== "") {
            props.active(queryParams.get('userCode') || "", queryParams.get('activeCode') || "")
        }
    }
    const renderElement = () => {
        if (props.state=='ACTIVED') {
          return  <div><h2>Actived success, please click</h2><a href="/">the link</a> to sign in system </div>
        }
        return <div><h2>please click the button</h2><button onClick={activeHandler}  className="login100-form-btn">Active</button> to active your account </div>    
    }

    return(
        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
         {
            renderElement()
         }
       </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAccount)