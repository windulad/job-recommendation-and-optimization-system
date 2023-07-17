import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const navigate = useNavigate();

    const [responseData, setResponseData] = useState(null);

    const [sessionVal, setSessionVal] = useState(null)

    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);
    const [checkbox4, setCheckbox4] = useState(false);
    const [checkbox5, setCheckbox5] = useState(false);

    // GET session_value from 'Entercv.js' OR 'Entermanual.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;

    const pass_data = { 
        value: session_value 
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/homepage', pass_data, { withCredentials: true });
                // GET data from server
                const job_data = response.data;
                //const job_data = JSON.stringify(response.data);
                console.log(job_data);
                const job_data_sliced = job_data.slice(2);

                setResponseData(job_data_sliced);

                //const position_id = responseData.0.
                
                // GET message from server
                const message = response.data[0]['message'];
                console.log(message)

                // GET session_value from server(user_id)
                const session_value = response.data[0]['session_value'];
                console.log(session_value)

                setSessionVal(session_value);

                const checkbox1 = response.data[1]['checkbox1']
                const checkbox2 = response.data[1]['checkbox2']
                const checkbox3 = response.data[1]['checkbox3']
                const checkbox4 = response.data[1]['checkbox4']
                const checkbox5 = response.data[1]['checkbox5']

                setCheckbox1(checkbox1);
                setCheckbox2(checkbox2);
                setCheckbox3(checkbox3);
                setCheckbox4(checkbox4);
                setCheckbox5(checkbox5);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const submit_data = { 
        value: session_value,
        checkbox1: checkbox1, 
        checkbox2: checkbox2,
        checkbox3: checkbox3, 
        checkbox4: checkbox4, 
        checkbox5: checkbox5
    };

    // form submit reload
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // POST to 'SERVER_URL' using Axios
        try {
            const response = await Axios.post(SERVER_URL+'/homepagesubmit', submit_data, { withCredentials: true });
            // GET data from server
            const job_data = response.data;
            //const job_data = JSON.stringify(response.data);
            console.log(job_data);
            const job_data_sliced = job_data.slice(2);

            setResponseData(job_data_sliced);

            //const position_id = responseData.0.
            
            // GET message from server
            const message = response.data[0]['message'];
            console.log(message)

            // GET session_value from server(user_id)
            const session_value = response.data[0]['session_value'];
            console.log(session_value)

            setSessionVal(session_value);

            const checkbox1 = response.data[1]['checkbox1']
            const checkbox2 = response.data[1]['checkbox2']
            const checkbox3 = response.data[1]['checkbox3']
            const checkbox4 = response.data[1]['checkbox4']
            const checkbox5 = response.data[1]['checkbox5']

            setCheckbox1(checkbox1);
            setCheckbox2(checkbox2);
            setCheckbox3(checkbox3);
            setCheckbox4(checkbox4);
            setCheckbox5(checkbox5);

        } catch (error) {
            console.error(error);
        }
        // Reload the page
        window.location.reload();
    };

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
            
            <div class="sidebar">
                <h1 class="sidebar_title">Change Selection</h1>
                <div class="sidebar_box">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="checkbox" checked={checkbox1} onChange={() => setCheckbox1(!checkbox1)} />
                            <label>software engineer</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checkbox2} onChange={() => setCheckbox2(!checkbox2)} />
                            <label>front end engineer</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checkbox3} onChange={() => setCheckbox3(!checkbox3)} />
                            <label>back end engineer</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checkbox4} onChange={() => setCheckbox4(!checkbox4)} />
                            <label>android engineer</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={checkbox5} onChange={() => setCheckbox5(!checkbox5)} />
                            <label>ios engineer</label>
                        </div>
                        <div class="signup_login">
                            <input type="submit" value="Save Changes"/>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default Home;

/*{responseData && (
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
    )}*/
