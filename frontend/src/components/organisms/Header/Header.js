import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../../redux/slice/authSlice";
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { isLoggedIn } = useAuth();
    console.log("header", isLoggedIn);
    const dispatch = useDispatch();
    const sendLogoutReq = async () => {
        const res = await axios.post("http://localhost:9000/api/user/logout", null, {
          withCredentials: true,
        });
        if (res.status == 200) {
          return res;
        }
        return new Error("Unable TO Logout. Please try again");
      };
      const handleLogout = () => {
        sendLogoutReq().then(() => dispatch(authActions.logout()));
      };
    return (
        <div>
            <ul className="header flex-container flex-s list-style"> 
                <li className="flex-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="flex-item">
                    <Link to="/about">About</Link>
                </li>
                { !isLoggedIn && (
                    <>
                        <li className="flex-item">
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li className="flex-item">
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                    
                )}
                { isLoggedIn && (
                    <li className="flex-item">
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                )}
                
            </ul>
        </div>
    )
}

export default Header