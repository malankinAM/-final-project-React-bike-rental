import {useCallback, useEffect, useState} from "react";

export const useAuth = () => {

    const [token, setToken] = useState(null)
    const [clientId, setClientId] = useState(null)

    const login = useCallback((jwtToken, clientId) => {
        setToken(jwtToken)
        setClientId(clientId)
        localStorage.setItem('userData', JSON.stringify({
            clientId: clientId, token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setClientId(null)

        localStorage.removeItem("userData")
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"))
        if (data && data.token) {
            login(data.token, data.clientId)
        }
    }, [login])
    return {login, logout, token, clientId}
}