import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function CreateAcc(){
    const [details, setDetails] = useState({
        email: "",
        password: ""
    });

    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

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
        try{
            Axios.post(SERVER_URL+'/createacc', json_details)
            .then(response => {
                // GET message from server
                const message = response.data.message;
                console.log(message)

                // GET session_value from server(user_id)
                const session_value = response.data.session_value;
                console.log(session_value)

                setResponseData(response.data);

                // POST session_value to 'Entercv.js'
                const data = { user_id: session_value };

                if (message === 'error-1'){
                    navigate('/createacc');
                }else if(message === 'success-1'){
                    navigate('/enterskills', {state: data});
                }
            })
        } catch(error){
            console.error(error);
        }
    };

    const handleclick3 = () => {
        navigate('/login');
    }

    return(
        <div class="create_acc_login">
            <h1 class="create_title">Create an Account</h1>
            <form onSubmit={handleSubmit}> 
                <div class="input_field">
                    <input type="text" name='email' placeholder="Email" onChange={handleChange} required/>
                </div>
                <div class="input_field">
                    <input type="password" name='password' placeholder="Password" onChange={handleChange} required/>
                </div>
                <div class="signup_login">
                    <input type="submit" value="Sign up"/>
                </div>
                <div class="termsofservice">
                    <label for="terms">Already have an account ? <a onClick={handleclick3}><strong>Log in</strong></a> here</label>
                </div>
            </form>
        </div>
    ) 
}

export default CreateAcc;