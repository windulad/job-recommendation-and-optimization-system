import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const navigate = useNavigate();

    const [responseData, setResponseData] = useState(null);

    // GET session_value from 'Entercv.js' OR 'Entermanual.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;

    const pass_data = {
        value: session_value
    }

    //console.log(session_value)
    //const data = session_value;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/homepage', pass_data, { withCredentials: true });
                console.log(response.data);
                // GET message from server
                const message = response.data.message;
                console.log(message)

                // GET session_value from server(user_id)
                const session_value = response.data.session_value;
                console.log(session_value)

                const data_set = response.data.data_set;
                console.log(data_set)

                setResponseData(response.data);

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