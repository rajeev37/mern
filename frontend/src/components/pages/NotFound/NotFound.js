import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate(-1);
        }, 2000);
    });
    
    return (
        <div>
            Page Not Found.
        </div>
    )
}

export default NotFound