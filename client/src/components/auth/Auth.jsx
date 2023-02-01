import './Auth.sass'
import Login from "./Login"
import Registration from "./Registration"
import {useDispatch, useSelector} from "react-redux";


const Auth = ({toggleAuth}) => {
    //Redux
    const dispatch = useDispatch()
        //States
    const authPopupCalled = useSelector(state => state.authPopup.authPopupCalled)
    const typeOfAuth = useSelector(state => state.typePopup.typeOfAuth)
        //Actions
    const chooseLogin = () => {
        dispatch({type: "chooseLogin"})
    }
    const chooseRegistration = () => {
        dispatch({type: "chooseRegistration"})
    }
    return (
        <>
            {
                typeOfAuth === "Login"
                    ?
                    <Login
                        className={authPopupCalled && typeOfAuth === "Login"? "auth" : "hidden"}
                        chooseRegistration={chooseRegistration}
                        toggleAuth={toggleAuth}
                    />
                    :
                    <Registration
                        className={authPopupCalled && typeOfAuth === "Registration"? "auth" : "hidden"}
                        chooseLogin={chooseLogin}
                        toggleAuth={toggleAuth}
                    />
            }
        </>
    )
}

export default Auth