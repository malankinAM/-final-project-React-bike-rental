import {useState} from "react";
import './home.sass'
import List from "../../components/list/List"
import PhotosItem from "../../components/photos/Photos-item"


const Home = () => {
    const [activePhoto, setActivePhoto] = useState(null)
    const activatePhoto = (index) => {
        {activePhoto === index? setActivePhoto(null): setActivePhoto(index)}
    }
    let featuresList = [
        'Отличному качеству',
        'Шаговой доступности наших мобильных точек из любой точки вашего города',
        'Большому ассортименту велосипедов на прокат',
        'Приятной цене']
    let galleryItems = [
        require("../../images/home/gallery/dmitrii-vaccinium-sw9Vozf6j_4-unsplash.webp"),
        require("../../images/home/gallery/sujeeth-potla-rqZaVL3HmTc-unsplash.webp"),
        require("../../images/home/gallery/mikkel-bech-yjAFnkLtKY0-unsplash.webp"),
        require("../../images/home/gallery/flo-karr-nCj0zBLIaAk-unsplash.webp"),
        require("../../images/home/gallery/geo-chierchia-qZ1KmFjfQq8-unsplash.webp"),
        require("../../images/home/gallery/sole-bicycles-JK6lD_y3aDg-unsplash.webp"),
    ]
    return (
        <div className="wrapper">
            <div className='home'>
                <section className="home__intro">
                    <h1 className="home__title">
                        Добро пожаловать в Eacycle
                    </h1>
                    <h3 className="home__subtitle">
                        Наша компания на протяжении 10 лет предоставляет в аренду велосипеды на любой вкус по доступной
                        цене
                        более чем в 50 городах России. <br/> И мы не планируем останавливаться
                    </h3>
                    <h3 className="home__features">
                        Клиенты выбирают нас благодаря:
                    </h3>
                    <List children={featuresList} className="home__features-list"/>
                </section>
                <section className="home__gallery">
                    <h1 className="home__title">
                        Галерея
                    </h1>
                    <div className="home__photos">
                        {galleryItems.map((item, index) =>
                            <PhotosItem
                                key={index}
                                className={activePhoto === index? "home__photos-item active": "home__photos-item"}
                                img={item}
                                onClick={() => activatePhoto(index)}
                            />
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}


export default Home