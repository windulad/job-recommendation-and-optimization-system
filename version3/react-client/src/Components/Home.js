import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const navigate = useNavigate();

    // GET session_value from 'Entercv.js' OR 'Entermanual.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;
    console.log(session_value)

    var json_details = JSON.stringify(session_value);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/homepage', json_details, { withCredentials: true });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    const handleclick1 = () => {
        navigate('/home');
    }

    const handleclick2 = () => {
        navigate('/learn');
    }

    const handleclick3 = () => {
        navigate('/enterskills');
    }

    const handleclick4 = () => {
        navigate('/profile');
    }

    const handleclick5 = () => {
        navigate('/settings');
    }

    const handleclick6 = () => {
        navigate('/logout');
    }

    return(
        <>
            <div>
                <ul class="home_topnav">
                    <li><a onClick={handleclick1}>Home</a></li>
                    <li><a onClick={handleclick2}>Learn</a></li>
                    <li><a onClick={handleclick3}>Skills</a></li>
                    <li><a onClick={handleclick4}>Profile</a></li>
                    <li><a onClick={handleclick5}>Settings</a></li>
                    <li style={{float:"right"}}><a onClick={handleclick6}>Log out</a></li>
                </ul>
            </div>
        </>
    )
}

export default Home;

/* <div class="main">
    <div class="search">
        <h1 class="main_title">Latest Courses to Follow</h1>
        <form onSubmit={handleSubmit}>
            <span class="search_field">
                <input type="text" name="position" placeholder="Position"/>
            </span>
            <span class="search_field">
                <input type="text" name="location" placeholder="Location"/>
            </span>
            <span class="search_field">
                <input type="submit" value="Search"/>
            </span>
        </form>
    </div>
</div> */