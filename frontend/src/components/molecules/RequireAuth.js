import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { toast } from 'react-toastify';
const RequireAuth = ({allowedRoles}) => {
    const location = useLocation()
    const { roles } = useAuth();
console.log("****req auth roles**", roles.some(role => allowedRoles.includes(role)));
    if(roles.some(role => allowedRoles.includes(role))) {
        return <Outlet />
    } else {
        toast.warn("You don't have access.");
        return <Navigate to="/login" state={{ from: location }} replace />
    }
}
export default RequireAuth