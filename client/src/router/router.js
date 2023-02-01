import {Route} from "react-router-dom";
import Cases from "../pages/cases/Cases";
import CaseDetail from "../pages/cases/CaseDetail";
import Officers from "../pages/officers/Officers";
import Profile from "../pages/profile/Profile";
import OfficerDetail from "../pages/officers/OfficerDetail";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Route path=''>
                <Route path='cases' element={<Cases/>}/>
                <Route path='cases/:id' element={<CaseDetail/>}/>
                <Route path='officers' element={<Officers/>}/>
                <Route path='officers/:id' element={<OfficerDetail/>}/>
                <Route path='profile/:id' element={<Profile/>}/>
            </Route>
        )
    }
}
