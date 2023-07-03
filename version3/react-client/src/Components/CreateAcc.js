import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function CreateAcc(){
    // POST email and password to server
    const [details, setDetails] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    }

    const [responseData, setResponseData] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        var json_details = JSON.stringify(details);

        // Make the POST request to 'ENDPOINT1' using Axios
        Axios.post(SERVER_URL+'/createacc', json_details)
        .then(response => {
            //console.log(json_details);
            const value = response.data.message;
            console.log(value)

            setResponseData(response.data);

            if (value === 'error-1'){
                navigate('/createacc');
            }else if(value === 'success-1'){
                navigate('/enterskills');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleclick3 = () => {
        navigate('/login');
    }

    return(
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label> 
                <input type="email" name='email' onChange={handleChange} required/>
                <label>Password:</label> 
                <input type="password" name='password' onChange={handleChange} required/>
                <button type="submit">Submit</button>
            </form>
            <h2>Already have an account?</h2>
            <button onClick={handleclick3}>Log in</button>
        </div>
    ) 
}

export default CreateAcc;