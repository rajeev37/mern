import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../../redux/slice/authSlice";
import jwtDecode from 'jwt-decode'
const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isEditor = false
    let isAdmin = false
    let status = "User"
    if (token) {
        const decoded = jwtDecode(token);
        console.log("****decode token***", decoded);
        const { id, roles } = decoded.userInfo

        isEditor = roles.includes(2001)
        isAdmin = roles.includes(3001)

        if (isEditor) status = "Editor"
        if (isAdmin) status = "Admin"
        console.log("****isEditor***", isEditor);
        console.log("****isAdmin***", isAdmin);
        return { id, roles, status, isEditor, isAdmin }
    }

    return { id: '', roles: [], isEditor, isAdmin, status }
}
export default useAuth