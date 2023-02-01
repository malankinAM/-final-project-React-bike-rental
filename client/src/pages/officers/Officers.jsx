import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import "./officers.sass"

const Officers = () => {
    const [officers, setOfficers] = useState([])
    const [loading, setLoading] = useState(true)
    //Add new officer
    const [create, setCreate] = useState(false)
    const [form, setForm] = useState({email: "", password: "", clientId:"", firstName: "", lastName: ""})
    const createHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    //Requests logic
    const {request} = useHttp()
    const createOfficer = async () => {
        try {
            await request("/api/officers/", "POST", form)
            console.log("Сотрудник создан")
        } catch (e) {
            console.log(e)
        }
    }
    const sendDelete = async (id) => {
        try {
            await request(`/api/officers/${id}`, "DELETE")
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        request("/api/officers/")
            .then(data => setOfficers(data))
            .then(() => setLoading(false))
    }, [])
    return (
        <section className="officers">
            <div className="wrapper">
                <h1>Сотрудники</h1>
                {loading === true && <h2 className="officers__subtitle">Загрузка...</h2>}
                {loading === false && officers.length !== 0 &&
                    <div className="officers__table">
                        <div className="officers__table-item">
                            <div className="officers__table-item-cell">
                                E-mail
                            </div>
                            <div className="officers__table-item-cell">
                                Имя
                            </div>
                            <div className="officers__table-item-cell">
                                Фамилия
                            </div>
                            <div className="officers__table-item-cell">
                                ClientID
                            </div>
                            <div className="officers__table-item-cell">
                                Подтвержден
                            </div>
                            <div className="officers__table-item-cell">
                                Действия
                            </div>
                        </div>
                        {officers.map(item =>
                            <div key={item._id} className="officers__table-item">
                                <div className="officers__table-item-cell">
                                    {item.email}
                                </div>
                                <div className="officers__table-item-cell">
                                    {item.firstName}
                                </div>
                                <div className="officers__table-item-cell">
                                    {item.lastName}
                                </div>
                                <div className="officers__table-item-cell">
                                    {item.clientId}
                                </div>
                                <div className="officers__table-item-cell">
                                    {item.approved ? "Подтвержден" : "Не подтвержден"}
                                </div>
                                <div
                                    style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                                    className="officers__table-item-cell"
                                >
                                    <Link
                                        className="officers__table-item-link"
                                        to={`/officers/${item._id}`}
                                    >
                                        Профиль
                                    </Link>
                                    <button
                                        style={{marginTop: "20px", color: "red"}}
                                        className="officers__table-item-button"
                                        onClick={e => {
                                            e.preventDefault()
                                            sendDelete(item._id)
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                }
                {officers.length === 0 && loading === false &&
                    <h2 className="cases__subtitle">Похоже, что у нас нет сотрудников...</h2>
                }
                {
                    create &&
                    <form className="officers__create">
                        <h2 className="officers__create-title">Добавить сотрудника</h2>
                        <label className="officers__create-label">E-mail</label>
                        <input
                            className="officers__create-input"
                            value={form.email}
                            onChange={createHandler}
                            name="email"
                            type="email"
                            required={true}
                        />
                        <label className="officers__create-label">Пароль</label>
                        <input
                            className="officers__create-input"
                            value={form.password}
                            onChange={createHandler}
                            name="password"
                            type="password"
                            required={true}
                        />
                        <label className="officers__create-label">ClientID</label>
                        <input
                            className="officers__create-input"
                            value={form.clientId}
                            onChange={createHandler}
                            name="clientId"
                            type="text"
                            required={true}
                        />
                        <label className="officers__create-label">Имя</label>
                        <input
                            className="officers__create-input"
                            value={form.firstName}
                            onChange={createHandler}
                            name="firstName"
                            type="text"
                        />
                        <label className="officers__create-label">Фамилия</label>
                        <input
                            className="officers__create-input"
                            value={form.lastName}
                            onChange={createHandler}
                            name="lastName"
                            type="text"
                        />
                        <button
                            style={{color: "white"}}
                            type="submit"
                            onClick={e => {
                                e.preventDefault()
                                createOfficer()
                            }}
                        >
                            Подтвердить
                        </button>
                    </form>
                }
                <button
                    style={{
                        margin: "30px auto 30px", color: "white", fontSize: "20px", border: "1px solid white",
                        padding: "20px", borderRadius: "20px"
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        create ? setCreate(false) : setCreate(true)
                    }}
                >
                    {create ? "Отменить" : "Добавить сотрудника"}
                </button>
            </div>
        </section>
    )
}

export default Officers