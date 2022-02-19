import { FC, ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const DefaultPage : FC<any> =(props): ReactElement => {
    /**
     * const searchParams = new URLSearchParams(useLocation().search)
    const navigate = useNavigate()
    const code = searchParams.get('token')
    useEffect(()=> {
        if (code) { 
            searchParams.delete('token')
            navigate('/', {replace: true})
        }
        
    },[])

     */
    return (
        <><h1>Welcome metax dashboard</h1></>
    )
}

export default DefaultPage