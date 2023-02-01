import "./contact.sass"
import Form from "../../components/form/Form"
import {useSelector} from "react-redux"

const Contact = () => {
    const id = useSelector(state => state.isAuth.clientId)
    return (
        <div className="wrapper">
            <div className="contact">
                <h1 className="contact__title">
                    Сообщить о краже
                </h1>
                <h2 className="contact__subtitle">
                    К сожалению, иногда происходят случаи кражи наших велосипедов.<br/>
                    Если вы хотите сообщить о таком случае, заполните, пожалуйста, форму ниже.
                </h2>
                <Form
                    data={
                        id !== null
                            ?
                            {
                                licenseNumber: "",
                                ownerFullName: "",
                                type: "",
                                clientId: id,
                                color: "",
                                date: "",
                                officer: "",
                                description: ""
                            }
                            :
                            {
                                licenseNumber: "",
                                ownerFullName: "",
                                type: "",
                                color: "",
                                date: "",
                                officer: "",
                                description: ""
                            }

                    }
                />
            </div>
        </div>
    )
}

export default Contact