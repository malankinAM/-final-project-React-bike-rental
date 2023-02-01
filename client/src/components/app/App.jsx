import {Routes, Route} from "react-router-dom"
import {useSelector} from "react-redux"
import './App.sass'
import Layout from "../layout/Layout"
import Home from "../../pages/home/Home"
import Contact from "../../pages/contact/Contact"

import {useRoutes} from "../../router/router";
import Error from "../../pages/error/Error";

const App = () => {
    const isAuth = useSelector(state => state.isAuth.isAuthenticated)
    const routes = useRoutes(isAuth)
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='contact' element={<Contact/>}/>
                {isAuth && routes}
                <Route path='*' element={<Error/>}/>
            </Route>
        </Routes>
    )
}

export default App
