import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login_image from '../assets/login/login_image.png';
const SERVER_URL = 'http://127.0.0.1:5000';

function Login(){
    //Create an account
    const [details, setDetails] = useState({
        email: "",
        password: ""
    });

    const [responseData, setResponseData] = useState(null);

    const [message, setMessage] = useState('');

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

        // POST email, password to 'SERVER_URL' using Axios
        Axios.post(SERVER_URL+'/login', json_details)
        .then(response => {
            // GET message from server
            const message = response.data.message;
            console.log(message)

            // GET session_value from server(user_id)
            const session_value = response.data.session_value;
            console.log(session_value)

            setResponseData(response.data);
            setMessage(message);

            // POST session_value to 'Home.js'
            const data = { user_id: session_value };

            if (message === 'error-2'){
                navigate('/login');
            }else if(message === 'success-2'){
                navigate('/home',  {state: data});
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
        <div className="container-login">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img 
                            src={login_image} 
                            alt="" 
                            style={{
                                width: '70%', 
                                height: 'auto',
                                margin: '0 auto',
                                marginLeft: '15%',
                                marginTop: '8%'
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div class="login">
                            <h1 class="login_title">Log in</h1>
                            
                            <form onSubmit={handleSubmit}>  
                                <div class="form-group">
                                    <input type="text" name='email' placeholder="Email Address" class="form-control  mb-4" onChange={handleChange} required/>
                                </div>
                                <div class="form-group">
                                    <input type="password" name='password' placeholder="Password" class="form-control mb-5" onChange={handleChange} required/>
                                </div>
                                <div className="login_submit" id="login_submit">
                                    <input type="submit" value="LOGIN"/>
                                </div>
                                <div className="login_error">
                                    <p>{message}</p>
                                </div>
                                
                                <div class="lostacc">
                                    <p>Don't have an account ? <a onClick={handleclick3}><b style={{ color: '#31437E' }}>Register here</b></a></p>
                                </div>
                                
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    ) 
}

export default Login;