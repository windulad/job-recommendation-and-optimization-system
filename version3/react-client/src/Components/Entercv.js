import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

Axios.defaults.withCredentials = true;

function EnterCV(){
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const [responseData, setResponseData] = useState(null);

    const navigate = useNavigate();

    // GET session_value from 'Createacc.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;
    //console.log(session_value)
    //var json_details = JSON.stringify(session_value);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('message', session_value);

        Axios.post(SERVER_URL+'/enter_cv', formData, { withCredentials: true }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            // GET message from server
            const message = response.data.message;
            console.log(message)

            // GET session_value from server(user_id)
            const session_value = response.data.session_value;
            console.log(session_value)

            setResponseData(response.data);

            // POST session_value to 'Home.js'
            const data = { user_id: session_value };

            if (message === 'error-3'){
                navigate('/entercv',  {state: data});
            }else if(message === 'success-3'){
                navigate('/home',  {state: data});
            }
        })
        .catch(error => {
            console.error(error);
            // Handle error
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default EnterCV;