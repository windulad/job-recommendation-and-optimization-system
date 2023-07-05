import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Login(){
    //Create an account
    // POST email and password to server
    const [details, setDetails] = useState({
        email: "",
        password: ""
    });

    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

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

    const handleclick3 = () => {
        navigate('/createacc');
    }

    return(
        <div class="create_acc_login">
            <h1 class="create_title">Log In</h1>
            <form onSubmit={handleSubmit}> 
                <div class="input_field">
                    <input type="text" name='email' placeholder="Email" onChange={handleChange} required/>
                </div>
                <div class="input_field">
                    <input type="password" name='password' placeholder="Password" onChange={handleChange} required/>
                </div>
                <div class="signup_login">
                    <input type="submit" value="Log in"/>
                </div>
                <div class="termsofservice">
                    <label for="terms">Don't have an account ? <a onClick={handleclick3}><strong>Sign Up</strong></a> here</label>
                </div>
            </form>
        </div>
    ) 
}

export default Login;