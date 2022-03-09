import { FC, ReactElement } from "react"
import { useCookies } from 'react-cookie'

const SignOut: FC<any> = (): ReactElement => {
    const [cookies, removeCookie] = useCookies(['token'])
    const signOutHandler =  (e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault()
        removeCookie('token','')
        window.location.reload()
    }

    return(
        <div className="container-login100-form-btn m-t-17">
            <button onClick={signOutHandler}  className="login100-form-btn">Sign Out</button>
        </div>
    )
}

export default SignOut