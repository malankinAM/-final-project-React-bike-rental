import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import "./profile.sass"

const Profile = () => {
    const userId = useParams().id
    const {request} = useHttp()
    const [user, setUser] = useState(null)
    const [newUser, setNewUser] = useState(null)
    const [loader, setLoader] = useState(true)

    const [changeName, setChangeName] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const startNameChanging = () => {
        setChangeName(true)
        let copy = {...user}
        delete copy["password"]
        setNewUser(copy)
    }
    const startPasswordChanging = () => {
        setChangePassword(true)
        setNewUser({password: ""})
    }
    const changingHandler = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }
    const cancelChanging = () => {
        setChangePassword(false)
        setChangeName(false)
        setNewUser(null)
    }
    const confirmChanging = async e => {
        e.preventDefault()
        request(`/api/officers/${userId}`, "PUT", newUser)
            .then(() => request(`/api/officers/${userId}`, "GET")
                .then((data) => setUser(data)))
            .then(() => {
                setChangeName(false)
                setChangePassword(false)
            })
            .catch(error => alert(error))
    }
    useEffect(() => {
        request(`/api/officers/${userId}`)
            .then(data => setUser(data))
            .then(() => setLoader(false))
    }, [])
    return (
        <section className="profile">
            <div style={{flexDirection: "column"}} className="wrapper">
                <h1 className="profile__title">Профиль</h1>
                {
                    loader
                        ?
                        <h2>Загрузка...</h2>
                        :
                        <>
                            {!changeName && !changePassword &&
                                <>
                                    <div className="officers__details-data-item">
                                        <h4 className="officers__details-data-item-title">Имя</h4>
                                        {user.firstName}
                                    </div>
                                    <div className="officers__details-data-item">
                                        <h4 className="officers__details-data-item-title">Фамилия</h4>
                                        {user.lastName}
                                    </div>
                                    <div className="officers__details-data-item">
                                        <h4 className="officers__details-data-item-title">E-mail</h4>
                                        {user.email}
                                    </div>
                                </>
                            }
                            {changeName &&
                                <>
                                    <h4 style={{marginTop: "40px"}}
                                        className="officers__details-data-item-title">Изменить имя</h4>
                                    <input
                                        name="firstName"
                                        type="text"
                                        className="profile__input"
                                        onChange={changingHandler}
                                        value={newUser.firstName}
                                    />
                                    <h4 style={{marginTop: "40px"}}
                                        className="officers__details-data-item-title">Изменить фамилию</h4>
                                    <input
                                        name="lastName"
                                        type="text"
                                        className="profile__input"
                                        onChange={changingHandler}
                                        value={newUser.lastName}
                                    />
                                </>
                            }
                            {changePassword &&
                                <>
                                    <h4 style={{marginTop: "40px"}}
                                        className="officers__details-data-item-title">Сменить пароль</h4>
                                    <input
                                        name="password"
                                        type="password"
                                        className="profile__input"
                                        onChange={changingHandler}
                                        value={newUser.password}
                                    />
                                </>
                            }
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                {!changePassword &&
                                    <button
                                        style={{
                                            marginTop: "30px",
                                            color: "white",
                                            fontSize: "20px",
                                            marginRight: "36px"
                                        }}
                                        onClick={(e) => changeName ? confirmChanging(e) : startNameChanging()}
                                    >
                                        {changeName ? "Подтвердить" : "Изменить имя / фамилию"}
                                    </button>
                                }
                                {!changeName &&
                                    <button
                                        style={{
                                            marginTop: "30px",
                                            color: "white",
                                            fontSize: "20px",
                                            marginRight: "36px"
                                        }}
                                        onClick={(e) => changePassword ? confirmChanging(e) : startPasswordChanging()}
                                    >
                                        {changePassword ? "Подтвердить" : "Изменить пароль"}
                                    </button>
                                }
                                {(changePassword || changeName) &&
                                    <button
                                        style={{marginTop: "30px", color: "white", fontSize: "20px"}}
                                        onClick={cancelChanging}
                                    >
                                        Отменить
                                    </button>
                                }

                            </div>
                        </>
                }
            </div>
        </section>
    );
};

export default Profile;