import {Link} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import {useEffect, useState} from "react"
import {useRefactor} from "../../hooks/date.hook"
import "./cases.sass"

const Cases = () => {
    const [table, setTable] = useState([])
    //Show loading until data is loaded
    const [loading, setLoading] = useState(true)
    //Get auth from store
    const {request} = useHttp()
    const {refactoredArray} = useRefactor()


    const sendDelete = async (data) => {
        try {
            await request(`/api/cases/${data}`, "DELETE")
            console.log("Успешно", data)
            window.location = window.location
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        request('/api/cases', "GET")
            .then(data => refactoredArray(data))
            .then(ready => setTable(ready))
            .then(() => setLoading(false))
            .catch(error => console.log(error))
    }, [])
    return (
        <section className="cases">
            <div className="wrapper">
                <h1 className="cases__title">Зарегистрированные случаи кражи велосипедов</h1>
                {loading === true && <h2 className="cases__subtitle">Загрузка...</h2>}
                {loading === false && table.length !== 0 &&
                    <div className="cases__table">
                        <div className="cases__table-item">
                            <div className="cases__item-cell">
                                Номер лицензии
                            </div>
                            <div className="cases__item-cell">
                                ФИО
                            </div>
                            <div className="cases__item-cell">
                                Тип велосипеда
                            </div>
                            <div className="cases__item-cell">
                                Цвет велосипеда
                            </div>
                            <div className="cases__item-cell">
                                Дата кражи
                            </div>
                            <div className="cases__item-cell">
                                Действия
                            </div>
                        </div>
                        {table.length === 0
                            ?
                            <></>
                            :
                            table.map(item =>
                                <div key={item._id} className="cases__table-item">
                                    <div className="cases__item-cell">
                                        {item.licenseNumber}
                                    </div>
                                    <div className="cases__item-cell">
                                        {item.ownerFullName}
                                    </div>
                                    <div className="cases__item-cell">
                                        {item.type}
                                    </div>
                                    <div className="cases__item-cell">
                                        {item.color !== "" ? item.color : "Не указан"}
                                    </div>
                                    <div className="cases__item-cell">
                                        {item.date}
                                    </div>
                                    <div className="cases__item-cell actions">
                                        <Link
                                            className="cases__item-link"
                                            to={`/cases/${item._id}`}
                                        >
                                            Подробноcти
                                        </Link>
                                        <button
                                            className="cases__item-button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                sendDelete(item._id)
                                            }}
                                        >
                                            Удалить
                                        </button>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
                {table.length === 0 && loading === false &&
                    <h2 className="cases__subtitle">Похоже, что сообщений о краже нет...</h2>
                }
            </div>
        </section>
    );
};

export default Cases;