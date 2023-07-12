import { Navigate,Outlet } from "react-router-dom";
import {useAuthStatus} from '../hooks/useAuthStatus';
import Spinner from "./Spinner";
function PrivateRoute() {
    const {loggedIn,checkingIn} =useAuthStatus()
    if(checkingIn){
        return <Spinner/>
    }
    return loggedIn?<Outlet />:<Navigate to='/login'/>
}

export default PrivateRoute;