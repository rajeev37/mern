import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { authActions, selectCurrentToken } from "../../redux/slice/authSlice";
import usePersist from '../hooks/usePersist';

axios.defaults.withCredentials = true;

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch();
    const history = useNavigate();
    const effectRan = useRef(false)
    const refreshToken = async () => {
        const res = await axios.get("http://localhost:9000/api/auth/refresh", {
            withCredentials: true
        }).catch(err => {
            console.log("***refresh token err", err);
            history("/");
        })
        const data = await res.data;
        console.log("***refresh token data", data);
        dispatch(authActions.setCredentials(data));
        return data;
    }
    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
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