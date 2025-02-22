import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRouterLayout = () => {

    const isLogged = useSelector ((state: any) => state.auth.isLogged)
    
     if (isLogged) return <Outlet />

     return <Navigate to={'/signin'}/>
}

export default ProtectedRouterLayout;
