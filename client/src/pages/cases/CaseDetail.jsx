import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import {useRefactor} from "../../hooks/date.hook"

const CaseDetail = () => {
    const typesOfBicycles = [
        'Городской', 'Дорожный', 'Горный', 'Шоссейный', 'Гибридный', 'BMX', 'Электровелосипед'
    ]
    const [details, setDetails] = useState(null)
    const [newDetails, setNewDetails] = useState(null)
    const [change, setChange] = useState(false)
    const [officers, setOfficers] = useState([])

    const {request} = useHttp()
    const {refactoredObject} = useRefactor()
    const caseId = useParams().id
    const startChanging = (e) => {
        e.preventDefault()
        setChange(true)
        setNewDetails({...details})
    }

    const changeHandler = (e) => {
        setNewDetails({
            ...newDetails,
            [e.target.name]: e.target.value
        })
    }

    const confirmChanging = async (e) => {
        e.preventDefault()
        if (newDetails.status === "done" && newDetails.resolution === "") {
            alert("Заполните 'Решение по случаю'")
        } else {
            request(`/api/cases/${caseId}`, "PUT", newDetails)
                .then(() => request(`/api/cases/${caseId}`, "GET")
                    .then((data) => setDetails(data))
                )
                .then(() => setChange(false))
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        request(`/api/cases/${caseId}`, "GET")
            .then(data => refactoredObject(data))
            .then(ready => setDetails(ready))
            .catch(error => console.log(error))
    }, [])
    useEffect(() => {
        request('/api/officers/', "GET")
            .then(data => data.filter(officer => officer.approved === true))
            .then(arr => setOfficers(arr))
            .catch(error => console.log(error))
    }, [])
    return (
        <section className="cases">
            <div className="wrapper">
                <h1 className="cases__title">
                    Данные по случаю
                </h1>
                {details === null
                    ?
                    <h2>Загрузка...</h2>
                    :
                    <form name="details" className="cases__details">
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title"> ClientID:</h5>
                            {details.clientId ? details.clientId : "Неавторизованный пользователь"}
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Сообщение создано:</h5>
                            {details.createdAt.split(' ', 4).join(' ')}
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Обновлено:</h5>
                            {details.updatedAt.split(' ', 4).join(' ')}
                        </div>

                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Статус сообщения:</h5>
                            {
                                change
                                    ?
                                    <select onChange={changeHandler} className="cases__details-select" name="status">
                                        {newDetails.status === "new"
                                            ?
                                            <>
                                                <option value="new">Новое</option>
                                                <option value="in_progress">Принято в работу</option>
                                                <option value="done">Завершено</option>
                                            </>
                                            :
                                            <>
                                                <option value="in_progress">Принято в работу</option>
                                                <option value="done">Завершено</option>
                                            </>
                                        }
                                    </select>
                                    :
                                    <>
                                        {details.status === "new" && ("Новое")}
                                        {details.status === "in_progress" && ("Принято в работу")}
                                        {details.status === "done" && ("Завершено")}
                                    </>
                            }
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Тип велосипеда:</h5>
                            {
                                change
                                    ?
                                    <select className="cases__details-select" name="type" onChange={changeHandler}>
                                        {typesOfBicycles.map(type =>
                                            <option key={type} value={type}>{type}</option>
                                        )}
                                    </select>
                                    :
                                    details.type

                            }
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Ответственный:</h5>
                            {
                                change
                                    ?
                                    <select className="cases__details-select" name="officer" onChange={changeHandler}>
                                        <option defaultValue="default">Выберите сотрудника</option>
                                        {officers.map(item =>
                                            <option key={item._id} value={`${item.firstName} ${item.lastName}`}>
                                                {item.firstName} {item.lastName}
                                            </option>
                                        )}
                                    </select>
                                    :
                                    details.officer ? details.officer : "Ответсвенный сотрудник не выбран"
                            }
                        </div>

                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Цвет велосипеда:</h5>
                            {
                                change
                                    ?
                                    <input className="cases__details-input"
                                           name="color"
                                           value={newDetails.color}
                                           onChange={changeHandler}
                                    />
                                    :
                                    details.color ? details.color : "Цвет не указан"
                            }
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Ф.И.О. сообщившего:</h5>
                            {
                                change
                                    ?
                                    <input className="cases__details-input"
                                           name="ownerFullName"
                                           value={newDetails.ownerFullName}
                                           onChange={changeHandler}
                                    />
                                    :
                                    details.ownerFullName
                            }
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Номер лицензии:</h5>
                            {
                                change
                                    ?
                                    <input className="cases__details-input"
                                           name="licenseNumber"
                                           value={newDetails.licenseNumber}
                                           onChange={changeHandler}
                                    />
                                    :
                                    details.licenseNumber
                            }
                        </div>

                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Дата кражи:</h5>
                            {
                                change
                                    ?
                                    <input
                                        type="date"
                                        name="date"
                                        value={newDetails.date.split(' ', 4).join(' ')}
                                        className="cases__details-input"
                                        onChange={(e) => {
                                            setNewDetails({
                                                ...newDetails,
                                                date: new Date(`${e.target.value}`).toUTCString()
                                            })
                                        }
                                        }
                                    />
                                    :
                                    details.date.split(' ', 4).join(' ')
                            }
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Описание случая:</h5>
                            {
                                change
                                    ?
                                    <textarea
                                        className="cases__details-textarea"
                                        name="description"
                                        value={newDetails.description}
                                        onChange={changeHandler}
                                    />
                                    :
                                    details.description
                            }
                        </div>
                        <div className="cases__details-item">
                            <h5 className="cases__details-item-title">Решение по случаю:</h5>
                            {
                                change && (details.status === "done" || newDetails.status === "done")
                                    ?
                                    <textarea
                                        className="cases__details-textarea"
                                        name="resolution"
                                        value={newDetails.resolution}
                                        onChange={changeHandler}
                                        required={newDetails.status === "done"}
                                    />
                                    :
                                    details.resolution ? details.resolution : "Решение не вынесено"

                            }

                        </div>

                        <button className="cases__details-button"
                                name="details"
                                type="submit"
                                onClick={change ? confirmChanging : startChanging}
                        >
                            {change ? "Принять изменения" : "Изменить"}
                        </button>
                    </form>
                }
            </div>
        </section>
    );
};

export default CaseDetail;