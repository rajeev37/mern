import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
    return (
        <div className='home'>
            <h1>MERN Stack Project</h1>
            <p>Fullstack MERN app to create role base Authentication and Authorization. </p>
            <div>
                <button type='button' className='sign-btn'><Link to="/signup"><span></span>SignUp</Link></button>
                <button type='button' className='sign-btn'><Link to="/login"><span></span>Login</Link></button>
            </div>
        </div>
    )
}

export default Home