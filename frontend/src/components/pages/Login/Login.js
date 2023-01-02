import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store";

const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = async () => {
        const { email, password } = inputs;
        const res = await axios.post("http://localhost:9000/api/user/signIn", {
            email,
            password
        }).catch(err => { console.log(err)});
        console.log(res);
        const data = await res.data;
        return data; 
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then(() => dispatch(authActions.login()))
            .then(() => history("/welcome"));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={inputs.email} onChange={handleChange} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={inputs.password} onChange={handleChange} />
                <input type="submit" value="Login" />
            </form> 
        </div>
    )
}

export default Login