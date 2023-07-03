import React from "react";
import { useNavigate } from 'react-router-dom';

function Home(){
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
            <button onClick={handleclick1}>Sign Up</button>
            <button onClick={handleclick2}>Login</button>
        </div>
    )
}

export default Home;