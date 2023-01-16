import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from "axios";
import { selectCurrentToken } from "../../../redux/slice/authSlice";

const Welcome = () => {
    const token = useSelector(selectCurrentToken)
    const [user, setUser] = useState();
    const headers = {
        "authorization": `Bearer ${token}`
    }
    useEffect(() => {
        axios.get("http://localhost:9000/api/user/user", {
            withCredentials: true,
            headers: headers
        }).then(res => {
            console.log("***user data res***", res.data);
            setUser(res.data.user);

        })
        .catch(err => {
            console.log("***user data err***", err);
        })
    }, [])
    
    return (
        <div>
            Welcome <h1>{user?.name}</h1>
            Status <h1>{user?.email}</h1>
        </div>
    )
}

export default Welcome