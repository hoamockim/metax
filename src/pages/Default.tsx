import { FC, ReactElement, useEffect } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { Footer, Header } from "../components/Layout"
import '../asserts/css/table.css'
import SignOut from "../components/UserProfile/SignOut"
import { ActionLoadPage } from "../redux/userprofile/UserAction"

type DefaultPagePropType = {
    load: (init: boolean) => void
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        load:  (init: boolean) => dispatch(ActionLoadPage(init)),
    }
}

const DefaultPage : FC<DefaultPagePropType> =(props): ReactElement => {
    props.load(true)
    useEffect(()=>{
        window.setInterval(()=> {
            props.load(false)
        }, 10000)
    },[])
    return (
        <>
        <Header/>
       <div className="wrapper">
       <div className="table">
            <div className="row header">
                <div className="cell">
                    Function Name
                </div>
                <div className="cell">
                    Api
                </div>
            </div>
    
            <div className="row">
                <div className="cell" data-title="Name">
                    Register
                </div>
                <div className="cell" data-title="Status">
                  Done
                </div>
            </div>
            <div className="row">
                <div className="cell" data-title="Name">
                    Login/Register by Facebook
                </div>
                <div className="cell" data-title="Status">
                   Done
                </div>
            </div>
            <div className="row">
                <div className="cell" data-title="Name">
                Login/Register by Google
                </div>
                <div className="cell" data-title="Status">
                   Done
                </div>
            </div>
            <div className="row">
                <div className="cell" data-title="Name">
                    Change password
                </div>
                <div className="cell" data-title="Status">
                    Done
                </div>
            </div>

            <div className="row">
                <div className="cell" data-title="Name">
                    Send mail
                </div>
                <div className="cell" data-title="Status">
                    Done
                </div>
            </div>

            <div className="row">
                <div className="cell" data-title="Name">
                    Active
                </div>
                <div className="cell" data-title="Status">
                    Done
                </div>
            </div>

            <div className="row">
                <div className="cell" data-title="Name">
                    Statistic
                </div>
                <div className="cell" data-title="Status">
                    Done
                </div>
            </div>
            <div className="row">
                <div className="cell" data-title="Name">
                    Logout
                </div>
                <div className="cell" data-title="Status">
                    Done
                </div>
            </div>
         </div>
        <a href="/password/change" className="btn-face m-b-20">Reset password</a>
        <a href="/sign-up" className="btn-face m-b-20"> Register</a>
        <SignOut/>
       </div>
        <Footer/>
        </>
    )
}

export default connect(null, mapDispatchToProps)(DefaultPage)