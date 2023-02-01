import {useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import AuthField from "./Auth-field";
import AuthButton from "./Auth-button";

const Registration = ({className, chooseLogin, toggleAuth}) => {
    const [form, setForm] = useState(
        {email: '', password: '', firstName: '', lastName: '', clientId: ''}
    )
    const {request} = useHttp()
    const formHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const register = async () => {
        try {
            await request("/api/auth/sign_up", "POST", {...form})
        } catch (e) {
            console.log(e)
        }
        chooseLogin()
        toggleAuth()
    }
    const registrationFields = [
        {
            name: "email",
            label: "Введите E-mail",
            type: "email",
            onChange: formHandler,
            isRequired: true
        },
        {
            name: "password",
            label: "Введите пароль",
            type: "password",
            onChange: formHandler,
            isRequired: true
        },
        {
            name: "firstName",
            label: "Ваше имя",
            type: "text",
            onChange: formHandler,
        },
        {
            name: "lastName",
            label: "Ваша фамилия",
            type: "text",
            onChange: formHandler,
        },
        {
            name: "clientId",
            label: "Ваш clientID",
            type: "text",
            onChange: formHandler,
            isRequired: true
        },
    ]
    return (
        <div className={className} onClick={toggleAuth}>
            <form className="auth__form" onClick={event => event.stopPropagation()}>
                <h2 className="auth__title">Войти в систему</h2>
                {registrationFields.map(item =>
                    <AuthField
                        key={item.name}
                        name={item.name}
                        label={item.label}
                        type={item.type}
                        onChange={item.onChange}
                        isRequired={item.isRequired}
                    />
                )}
                <div className="auth__buttons">
                    <AuthButton
                        type={"submit"}
                        onClick={chooseLogin}
                        text={"Назад"}
                    />
                    <AuthButton
                        type={"submit"}
                        onClick={event => {
                            event.preventDefault()
                            register()
                        }}
                        text={"Регистрация"}
                    />
                </div>
            </form>
        </div>
    );
};

export default Registration;