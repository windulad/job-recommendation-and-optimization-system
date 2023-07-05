import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

Axios.defaults.withCredentials = true;

function EnterCV(){
    // // POST cv to server
    const [file, setFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        Axios.post(SERVER_URL+'/enter_cv', formData, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            const value = response.data.message;
            console.log(value)
            // Handle successful response
            setResponseData(response.data);

            if (value === 'error-3'){
                navigate('/entercv');
            }else if(value === 'success-3'){
                navigate('/home');
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