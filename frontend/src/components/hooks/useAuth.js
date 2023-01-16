import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../../redux/slice/authSlice";
import jwtDecode from 'jwt-decode'
const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    console.log("****userAutth token", token);
    let isEditor = false
    let isAdmin = false
    let status = "User"
    if (token) {
        const decoded = jwtDecode(token);
        console.log("****decode token***", decoded);
        const { id, roles } = decoded.userInfo

        isEditor = roles.includes('Editor')
        isAdmin = roles.includes('Admin')

        if (isEditor) status = "Editor"
        if (isAdmin) status = "Admin"

        return { id, roles, status, isEditor, isAdmin, token }
    }

    return { id: '', roles: [], isEditor, isAdmin, status, token }
}
export default useAuth