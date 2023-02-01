const defaultState = {
    authPopupCalled: false,
    typeOfAuth: "Login",
    userDropCalled: false
}

export const authPopupReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "toggleAuthPopup" :
            return {
                authPopupCalled: !state.authPopupCalled
            }
        default:
            return state
    }
}
export const typeOfAuthReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "chooseLogin":
            return {
                typeOfAuth: "Login"
            }
        case "chooseRegistration" :
            return {
                typeOfAuth: "Registration"
            }
        default:
            return state
    }
}
export const userDropReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "toggleUserDrop" :
            return {
                userDropCalled: !state.userDropCalled
            }
        default:
            return state
    }
}
