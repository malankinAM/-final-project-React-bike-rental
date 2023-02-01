import {Link} from "react-router-dom";

const Error = () => {
    return (
        <section className="error">
            <div style={{flexDirection: "column"}} className="wrapper">
                <h1>Ошибка</h1>
                <Link style={{fontSize: "20px", marginTop: "60px"}} to='/'>Вернуться на главную страницу</Link>
            </div>
        </section>
    );
};

export default Error;