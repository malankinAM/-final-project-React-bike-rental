import {useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import {useAuth} from "../../hooks/auth.hook"
import AuthField from "./Auth-field"
import AuthButton from "./Auth-button"
import {setTokenAction} from "../../store/authReducer"
import {useDispatch} from "react-redux"


const Login = ({className, chooseRegistration, toggleAuth}) => {
    //Local state
    const [form, setForm] = useState({email: '', password: ''})
    //Use hooks
    const {request} = useHttp()
    const auth = useAuth()
    //Redux actions
    const dispatch = useDispatch()
    const formHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    //Other functions
    const login = async () => {
        try {
            const data = await request("/api/auth/sign_in", "POST", {...form})
            auth.login(data.token, data.clientId)
            console.log(data)
            dispatch(setTokenAction({token: data.token, clientId: data.clientId}))
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div className={className} onClick={toggleAuth}>
            <form className="auth__form" onClick={event => event.stopPropagation()}>
                <h2 className="auth__title">Войти в систему</h2>
                <AuthField
                    name={"email"}
                    label={"Ваш E-mail"}
                    type={"email"}
                    onChange={formHandler}
                />
                <AuthField
                    name={"password"}
                    label={"Ваш пароль"}
                    type={"password"}
                    onChange={formHandler}

                />
                <div className="auth__buttons">
                    <AuthButton
                        type={"button"}
                        onClick={chooseRegistration}
                        text={"Регистрация"}
                    />
                    <AuthButton
                        type={"submit"}
                        onClick={(e) => {
                            e.preventDefault()
                            login()
                        }}
                        text={"Войти"}
                    />
                </div>
            </form>
        </div>
    )
}

export default Login;