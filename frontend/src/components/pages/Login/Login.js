import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import "./Login.css";
import { authActions } from "../../../redux/slice/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({});
    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = async () => {
        const { email, password } = inputs;
        try {
            const res = await axios.post("http://localhost:9000/api/auth/signIn", {
                email,
                password
            });
            console.log("Sign in res.", res.data);
            const data = await res.data;
            toast.info("Signed In Successfully!");
            dispatch(authActions.setCredentials(data));
            localStorage.setItem("persist", JSON.stringify(true));
            history("/welcome");
        } catch (error) {
            console.log("Sign in error.", error.response.data.message);
            setError({
                message: error.response.data.message
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    };
    let errorContainer = error && (<div className='alert'>{error.message}</div>);
    return (
        <div className='hero'>
            <div className='form-box'>
                <div className='button-box'>
                    <div id='btn'></div>
                    <button type="button" className="toggle-btn">Login In</button>
                    <button type="button" className="toggle-btn">Register</button>
                </div>
                {errorContainer}
                <form className='input-group' onSubmit={handleSubmit}>
                    <input type="text" className='input-field' id="email" name="email" placeholder='Enter Email Address' value={inputs.email} onChange={handleChange} />
                    <input type="password" className='input-field' id="password" name="password" placeholder='Enter Password' value={inputs.password} onChange={handleChange} />
                    <button type='submit' className='submit-btn'> Login In</button>
                </form>
            </div>
        </div>
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <label htmlFor="email">Email:</label>
        //         <input type="text" id="email" name="email" value={inputs.email} onChange={handleChange} />
        //         <label htmlFor="password">Password:</label>
        //         <input type="password" id="password" name="password" value={inputs.password} onChange={handleChange} />
        //         <input type="submit" value="Login" />
        //     </form> 
        // </div>
    )
}

export default Login