import {useEffect} from "react"
import FormField from "./Form-field"
import {useSelector} from "react-redux"
import {useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import './form.sass'



const Form = ({data}) => {
    const isAuth = useSelector(state => state.isAuth.isAuthenticated)
    const [form, setForm] = useState(data)
    const [message, setMessage] = useState(false)
    const [officers, setOfficers] = useState([])
    const {request} = useHttp()

    const createReport = async () => {
        try {
            const data = await request( !isAuth? '/api/public/report/': '/api/cases/', "POST", {...form})
            console.log(data)
            setMessage(true)
        } catch (e) {
            console.log(e)
        }
    }
    const formHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const typesOfBicycles = [
        'Городской', 'Дорожный', 'Горный', 'Шоссейный', 'Гибридный', 'BMX', 'Электровелосипед'
    ]
    useEffect(() => {
        request('/api/officers/', "GET")
            .then(data => data.filter(officer => officer.approved === true))
            .then(arr => setOfficers(arr))
            .catch(error => console.log(error))
    }, [])
    return (
        <>
            {
                message
                    ?
                    <h1 className="contact__title">Сообщение отправлено.</h1>
                    :
                    <form className="contact-form">
                        <div className="contact-fields">
                            <FormField
                                name="licenseNumber"
                                onChange={formHandler}
                                label="Номер лицензии (обязательно)"
                                inputType="text"
                                isRequired={true}
                            />
                            <FormField
                                name="ownerFullName"
                                onChange={formHandler}
                                label="Ф.И.О. (обязательно)"
                                inputType="text"
                                isRequired={true}
                            />
                        </div>
                        <div className="contact-fields">
                            <div className="contact-input-container">
                                <label className="contact-label">Тип (обязательно)</label>
                                <select
                                    name="type"
                                    defaultValue="default"
                                    className="contact-select"
                                    required={true}
                                    onChange={formHandler}
                                >
                                    <option value="default" disabled>Тип велосипеда</option>
                                    {typesOfBicycles.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <FormField
                                name="color"
                                onChange={formHandler}
                                label="Цвет велосипеда"
                                inputType="text"
                                isRequired={false}
                            />
                            <FormField
                                name="date"
                                onChange={formHandler}
                                label="Дата кражи"
                                inputType="date"
                                isRequired={false}
                            />
                        </div>
                        {
                            isAuth
                                ?
                                <div className="contact-input-container" style={{maxWidth: 50 + "%", marginLeft: 0}}>
                                    <label className="contact-label">Ответственный сотрудник (обязательно)</label>
                                    <select
                                        defaultValue="default"
                                        className="contact-select"
                                        required={true}
                                    >
                                        <option value="default">Ответственный сотрудник</option>
                                        {officers.map(item =>
                                            <option key={item._id} value={`${item.firstName} ${item.lastName}`}>
                                                {item.firstName} {item.lastName}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                : <></>
                        }
                        <label className="contact-label">Дополнительная информация</label>
                        <textarea
                            name="description"
                            onChange={formHandler}
                            className="contact-textarea"
                        >
                        </textarea>
                        <button className="contact-submit"
                                onClick={event => {
                                    event.preventDefault()
                                    createReport()
                                }}
                                type="submit"
                        >
                            Сообщить
                        </button>
                    </form>
            }
        </>
    )
}

export default Form