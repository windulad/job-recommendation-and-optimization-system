import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        email: "",
        password: ""
    });

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var json_details = JSON.stringify(details);

        // Make the POST request to 'ENDPOINT1' using Axios
        Axios.post(SERVER_URL+'/login', json_details)
        .then(response => {
            //console.log(json_details);
            const message = response.data.message;
            console.log(message)

            const user_id = response.data.user_id;
            console.log(user_id)

            // Store user_id in browser storage
            localStorage.setItem('user_id', user_id);

            setResponseData(response.data);

            if (message === 'error-2'){
                navigate('/login');
            }else if(message === 'success-2'){
                navigate('/home');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }


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

            <div class="main">
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
            </div>
        </>
    )
}

export default Home;