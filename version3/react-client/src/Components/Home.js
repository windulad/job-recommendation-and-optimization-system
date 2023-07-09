import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const navigate = useNavigate();

    const [responseData, setResponseData] = useState(null);

    const [sessionVal, setSessionVal] = useState(null)

    // GET session_value from 'Entercv.js' OR 'Entermanual.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;

    const pass_data = { value: session_value };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/homepage', pass_data, { withCredentials: true });
                // GET data from server
                const job_data = response.data;
                //const job_data = JSON.stringify(response.data);
                //console.log(job_data);
                const job_data_sliced = job_data.slice(1);

                setResponseData(job_data_sliced);

                //const position_id = responseData.0.
                
                // GET message from server
                const message = response.data[0]['message'];
                console.log(message)

                // GET session_value from server(user_id)
                const session_value = response.data[0]['session_value'];
                console.log(session_value)

                setSessionVal(session_value);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const data = { user_id: sessionVal };

    const handleclick1 = () => {
        navigate('/home',  {state: data});
    }

    const handleclick2 = () => {
        navigate('/learn',  {state: data});
    }

    const handleclick3 = () => {
        navigate('/profile',  {state: data});
    }

    const handleclick5 = () => {
        navigate('/');
    }

    if (responseData === null){
        return <div>Loading...</div>
    }

    return(
        <div>
            <div>
                <ul class="home_topnav">
                    <li><a onClick={handleclick1}>Home</a></li>
                    <li><a onClick={handleclick2}>Learn</a></li>
                    <li><a onClick={handleclick3}>Profile</a></li>
                    <li style={{float:"right"}}><a onClick={handleclick5}>Log out</a></li>
                </ul>
            </div>
            <div class="main">
                <div class="main_box">
                    {responseData.map((element) => {
                        return(
                            <ul class="job_list">
                                <li>{element.position}</li><br />
                                <li class="job_title">{element.title}</li><br />
                                <li>{element.company}</li><br />
                                <li>{element.location}</li><br />
                                <li>{element.summary}</li><br />
                                <li>Apply via {element.platform} <a href={element.url} target="_blank">Click here!</a></li><br />
                                <li>{element.post_date}</li><br />
                            </ul>
                        );
                    })};
                </div>
            </div>
        </div>
    );
}

export default Home;

/*{responseData && (
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
    )}*/
