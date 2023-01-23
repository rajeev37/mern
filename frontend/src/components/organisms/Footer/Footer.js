import React from 'react'
import useAuth from '../../hooks/useAuth';
import "./Footer.css";
const Footer = () => {
    const { id, status } = useAuth()
    const content = (
        <footer className="dash-footer">
            <hr></hr>
            <p>Current User id: {id}</p>
            <p>Status: {status}</p>
        </footer>
    )
    return content
}

export default Footer