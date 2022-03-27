import React, {FC, lazy, ReactElement, useEffect } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'

const LoginPage = lazy(() => import('./pages/Login'))
const DefaultPage = lazy(() => import('./pages/Default'))
const background = require('./asserts/images/bg02.jpg')
const styles = {
    container: {
        backgroundImage:` url(${background})`,
    }
}

type JwtInfo = {
    userCode: string,
    exp: number,
    iat: number,
    role: string,
}

type AccountType = {
    login: {},
    page: {},
}

const AccountPage: FC<AccountType> = (props): ReactElement => {
    const [cookies, setCookie] = useCookies(['token'])
    let isAuthenticated: boolean = false
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    let token: string = ""
   

    if (cookies.token && cookies.token!=='') {
        token = cookies.token
    }else if (queryParams.has('token') && queryParams.get('token')!=="") {
        token = queryParams.get('token') || ""
    }
    
    if (token !== "") {    
        const decodedToken: JwtInfo = jwtDecode(token)
        isAuthenticated = (decodedToken == null || decodedToken.exp  < Math.floor(Date.now()/1000)) ? false : true 
        if (isAuthenticated) localStorage.setItem('jwt', token)
    }

    useEffect(()=>{
        if (isAuthenticated) {
            setCookie('token', token)
            navigate('/',{replace: true})
        }
    },[])

    return (
        <div className="limiter">
            {!isAuthenticated ? 
                <div className="container-login100" style={styles.container}> {props.login} </div>: 
                <div >{props.page}</div>
            }
        </div>
    )
}

const signRoutes = [
    {
        path: '/sign-up',
        component: ()=> <LoginPage currentState={2}/> 
    },
    {
        path: '/active',
        component: ()=> <LoginPage currentState={3}/> 
    },
    {
        path: '/password/change',
        component: ()=> <LoginPage currentState={4}/> 
    },
]

const authenticatedRoutes = [
    {
        path: '/',
        component: () => <AccountPage login = {<LoginPage currentState={1}/>} page={<DefaultPage/>}/>
    },
]

const routes = [
    ...signRoutes,
    ...authenticatedRoutes,
]

export default routes
