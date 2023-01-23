import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { authActions, selectCurrentToken } from "../../redux/slice/authSlice";
import { toast } from 'react-toastify';
// import usePersist from '../hooks/usePersist';

axios.defaults.withCredentials = true;

const PersistLogin = () => {
    let persist = localStorage.getItem("persist", JSON.stringify(true));
    const token = useSelector(selectCurrentToken);
    console.log("***persist", persist);
    console.log("***token", token);
    const dispatch = useDispatch();
    const history = useNavigate();
    const effectRan = useRef(false)
    const refreshToken = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/auth/refresh", {
                withCredentials: true
            });
            const data = await res.data;
            console.log("***refresh token data", data);
            dispatch(authActions.setCredentials(data));
        } catch (error) {
            toast.warn(error.response.data.message);
            console.log("***refresh token err", error);
            history("/");
        }
    }
    useEffect(() => {
        if (effectRan.current === true) {
            if (!token && persist) refreshToken();
        }
        return () => effectRan.current = true
    }, [])
    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (token) { //persist: yes, token: yes
        console.log('token and uninit')
        content = <Outlet />
    }
    return content;
}
export default PersistLogin