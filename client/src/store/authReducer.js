let defaultState = {
    token: null,
    clientId: null,
    login: function noop() {},
    logout: function noop() {},
    isAuthenticated: false
}
function checkForAuth(){
    if(localStorage.hasOwnProperty('userData')) {
        return (
            defaultState = {
                ...defaultState,
                token: JSON.parse(localStorage.getItem('userData')).token,
                clientId: JSON.parse(localStorage.getItem('userData')).clientId,
                isAuthenticated: true
            }
        )
    }
}
checkForAuth()

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "setToken":
            return {
                ...state,
                token: action.payload.token,
                clientId: action.payload.clientId,
                isAuthenticated: Boolean(action.payload.token)
            }
        default:
            return state
    }
}
export const setTokenAction = payload => ({type:"setToken", payload})