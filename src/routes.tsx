import React, {FC, lazy, ReactElement, useEffect } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import jwtDecode from 'jwt-decode'
import rdx from './redux/Store'
import { useCookies } from 'react-cookie'


const LoginPage = lazy(() => import('./pages/Login'))
const DefaultPage = lazy(() => import('./pages/Default'))

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
    if (cookies.token) {
        isAuthenticated = true
    }
   
    return (
      <>
        {!isAuthenticated ? props.login: props.page}
      </>
    )
}

const signRoutes = [
    {
        path: '/sign-up',
        component: ()=> <LoginPage currentState={2}/> 
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
