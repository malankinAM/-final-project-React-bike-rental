import {combineReducers, createStore} from "redux";
import {authPopupReducer, typeOfAuthReducer, userDropReducer} from "./modalReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    authPopup: authPopupReducer,
    typePopup: typeOfAuthReducer,
    userDrop: userDropReducer,
    isAuth: authReducer
})

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)