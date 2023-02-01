import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"

const OfficerDetail = () => {
    //States
    const [details, setDetails] = useState(null)
    const [newDetails, setNewDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [change, setChange] = useState(false)
    //Requests and params
    const {request} = useHttp()
    const officerId = useParams().id
    //Changing functions
    const startChanging = e => {
        e.preventDefault()
        setChange(true)
        const copy = {...details}
        delete copy["password"]
        setNewDetails(copy)
    }
    const changingHandler = e => {
        setNewDetails({
            ...newDetails,
            [e.target.name] : e.target.value
        })
    }
    const confirmChanging = async e => {
        e.preventDefault()
        request(`/api/officers/${officerId}`, "PUT", newDetails)
            .then(() => request(`/api/officers/${officerId}`, "GET")
                .then((data) => setDetails(data)))
            .then(() => setChange(false))
            .catch(error => alert(error))

    }

    useEffect(() => {
        request(`/api/officers/${officerId}`, "GET")
            .then(data => setDetails(data))
            .then(() => setLoading(false))
            .catch(error => console.log(error))
    }, [])
    return (
        <section className="officers__details">
            <div className="wrapper">
                <h1 className="officers__title">Данные по сотруднику</h1>
                {loading
                    ?
                    <h2>Загрузка...</h2>
                    :
                    change
                        ?
                        <>
                            <form className="officers__details-data">
                                <div className="officers__details-data-item">
                                    <h3 className="officers__details-data-item-title">Имя</h3>
                                    <input
                                        name="firstName"
                                        type="text"
                                        className="officers__details-input"
                                        onChange={changingHandler}
                                        value={newDetails.firstName}
                                    />
                                </div>
                                <div className="officers__details-data-item">
                                    <h3 className="officers__details-data-item-title">Фамилия</h3>
                                    <input
                                        name="lastName"
                                        type="text"
                                        className="officers__details-input"
                                        onChange={changingHandler}
                                        value={newDetails.lastName}
                                    />
                                </div>
                                <div className="officers__details-data-item">
                                    <h3 className="officers__details-data-item-title">Одобрен</h3>
                                    <input
                                        name="approved"
                                        type="checkbox"
                                        className="officers__details-input"
                                        onChange={e => {
                                            setNewDetails({...newDetails, approved: e.target.checked})
                                        }}
                                        value={newDetails.approved}
                                        checked={newDetails.approved}
                                    />
                                </div>
                            </form>
                            <button className="officers__details-button" type="button" onClick={confirmChanging}>
                                Подтвердить
                            </button>
                        </>
                        :
                    <>
                        <form className="officers__details-data">
                            <div className="officers__details-data-item">
                                <h3 className="officers__details-data-item-title">Имя</h3>
                                <span className="officers__details-data-item-text">
                                    {details.firstName !== "" ? details.firstName : "Не указано"}
                                </span>
                            </div>
                            <div className="officers__details-data-item">
                                <h3 className="officers__details-data-item-title">Фамилия</h3>
                                <span className="officers__details-data-item-text">
                                    {details.lastName !== "" ? details.lastName : "Не указано"}
                                </span>
                            </div>
                            <div className="officers__details-data-item">
                                <h3 className="officers__details-data-item-title">ClientID</h3>
                                <span className="officers__details-data-item-text">
                                    {details.clientId}
                                </span>
                            </div>
                            <div className="officers__details-data-item">
                                <h3 className="officers__details-data-item-title">E-mail</h3>
                                <span className="officers__details-data-item-text">
                                    {details.email}
                                </span>
                            </div>
                            <div className="officers__details-data-item">
                                <h3 className="officers__details-data-item-title">Одобрен</h3>
                                <span className="officers__details-data-item-text">
                                    {details.approved ? "Сотрудник одобрен" : "Сотрудник ещё не одобрен"}
                                </span>
                            </div>
                        </form>
                        <button className="officers__details-button" type="button" onClick={startChanging}>
                            Внести изменения
                        </button>
                    </>
                }
            </div>
        </section>
    )
}

export default OfficerDetail