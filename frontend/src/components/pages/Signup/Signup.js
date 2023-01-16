import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
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
        const { name, email, password } = inputs;
        const res = await axios.post("http://localhost:9000/api/auth/signUp", {
            name,
            email,
            password
        }).catch(err => { console.log(err)});
        const data = await res.data;
        return data; 
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => {
            history("/login");
        })
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={inputs.name} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={inputs.email} onChange={handleChange} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={inputs.password} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form> 
        </div>
    )
}

export default Signup