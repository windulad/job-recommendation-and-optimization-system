import React from "react";
import './Style.css';
import { useNavigate } from 'react-router-dom';

function Index(){
    //Homepage Navigation
    const navigate = useNavigate();

    const handleclick1 = () => {
        navigate('/createacc');
    }

    const handleclick2 = () => {
        navigate('/login');
    }

    return(
        <div class="topnav">
            <a onClick={handleclick1}>Sign Up</a>
            <a onClick={handleclick2}>Login</a>
        </div>
    )
}

export default Index;