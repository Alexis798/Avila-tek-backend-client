
import { useDispatch, useSelector } from "react-redux"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth )
    const dispatch = useDispatch()

    const startLogin = async ({ data }) => {

        if (data == undefined || data.user == null) {
            dispatch( onLogout('Crendeciales Incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 10)
            console.log(data)
        } else {

            dispatch( onChecking() )

            localStorage.setItem('token', data.user.email);
            localStorage.setItem('tokenName', data.user.name)
            localStorage.setItem('tokenLastName', data.user.lastName)
            dispatch( onLogin({ name: data.user.name, lastName: data.user.lastName, email: data.user.email}))

        }

        
        
        
    }

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token')
        if (!token) return dispatch( onLogout() )

        const tokenName = localStorage.getItem('tokenName')
        const tokenLastName = localStorage.getItem('tokenLastName')
        dispatch( onLogin({ name: tokenName, lastName: tokenLastName, email: token}))
        
        
    }

    const startRegister = ({ data }) => {

        console.log(data.name)
        
        dispatch( onChecking() )

        localStorage.setItem('token', data.email);
        localStorage.setItem('tokenName', data.name)
        localStorage.setItem('tokenLastName', data.lastName)
        dispatch( onLogin({ name: data.name, lastName: data.lastName, email: data.email}))
       
    }

    const errorMessageFunction = () => {

        dispatch( onLogout('Something went wrong!'))
        setTimeout(() => {
            dispatch( clearErrorMessage())
        }, 10)

    }

    const startLogout = () => {
        localStorage.clear()
        dispatch( onLogout() )
    }

    return {
        errorMessage,
        user,
        status,

        startLogin,
        checkAuthToken,
        startLogout,
        startRegister,
        errorMessageFunction
    }
}