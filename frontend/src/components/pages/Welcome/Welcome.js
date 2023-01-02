import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
    const [user, setUser] = useState();
    const history = useNavigate();
    const refreshToken = async () => {
        const res = await axios.get("http://localhost:9000/api/user/refresh", {
            withCredentials: true
        }).catch(err => {
            return err.response;
        })
        const data = await res.data;
        return data;
    }
    const sendRequest = async () => {
        const res = await axios.get("http://localhost:9000/api/user/user", {
            withCredentials: true
        }).catch(err => {
            return err.response;
        })
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        if(true) {
            firstRender = false;
            sendRequest()
                .then((data) => {
                    if(!data.user) {
                        history("/");
                    }
                    setUser(data.user);
                })
                .catch((err) => {
                    history("/");
                })
        }
        let interval = setInterval( () => {
            refreshToken()
                .then((data) => {
                    if(!data.user) {
                        history("/");
                    }
                    setUser(data.user);
                })
                .catch((err) => {
                    history("/");
                })
        }, 1000 * 28) 
        return () => clearInterval(interval);
    }, [])
    return (
        <div>
            Welcome {user && <h1>{user.name}</h1>}
        </div>
    )
}

export default Welcome