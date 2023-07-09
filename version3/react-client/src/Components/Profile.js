import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState(null);

    // GET session_value from 'Home.js'
    const [sessionVal, setSessionVal] = useState(null);

    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;
    //console.log(session_value)

    // handle data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [postalcode, setPostalCode] = useState('');

    const pass_data = { 
        value: session_value,
    };

    // page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/profile', pass_data, { withCredentials: true });
                // GET message from server
                const message = response.data.message;
                console.log(message)
                setResponseData(response.data);

                // GET session_value from server(user_id)
                const session_value = response.data.session_value;
                console.log(session_value)
                setSessionVal(session_value);

                const email = response.data.email;
                const password = response.data.password;
                const username = response.data.username;
                const phone = response.data.phone;
                const address = response.data.address;
                const country = response.data.country;
                const postalcode = response.data.postalcode;

                setEmail(email);
                setPassword(password);
                setUsername(username);
                setPhone(phone);
                setAddress(address);
                setCountry(country);
                setPostalCode(postalcode);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const submit_data = { 
        value: session_value,
        email: email, 
        password: password,
        username: username, 
        phone: phone, 
        address: address, 
        country: country, 
        postalcode: postalcode
    };

    // form submit reload
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // POST email, password to 'SERVER_URL' using Axios
        try {
            const response = await Axios.post(SERVER_URL+'/profilesubmit', submit_data, { withCredentials: true });
            // GET message from server
            const message = response.data.message;
            console.log(message)
            console.log('re-load')
            setResponseData(response.data);

            // GET session_value from server(user_id)
            const session_value = response.data.session_value;
            console.log(session_value)
            setSessionVal(session_value);

            const email = response.data.email;
            const password = response.data.password;
            const username = response.data.username;
            const phone = response.data.phone;
            const address = response.data.address;
            const country = response.data.country;
            const postalcode = response.data.postalcode;

            setEmail(email);
            setPassword(password);
            setUsername(username);
            setPhone(phone);
            setAddress(address);
            setCountry(country);
            setPostalCode(postalcode);

        } catch (error) {
            console.error(error);
        }
        // Reload the page
        window.location.reload();
    };

    
    // navigation 
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

    // form data handle
    const handleChange1 = (event) => {
        setEmail(event.target.value);
    };
    const handleChange2 = (event) => {
        setPassword(event.target.value);
    };
    const handleChange3 = (event) => {
        if (event.target.value === null){
            setUsername('');
        } else {
            setUsername(event.target.value);
        }
    };
    const handleChange4 = (event) => {
        if (event.target.value === null){
            setPhone('');
        } else {
            setPhone(event.target.value);
        }
    };
    const handleChange5 = (event) => {
        if (event.target.value === null){
            setAddress('');
        } else {
            setAddress(event.target.value);
        }
    };
    const handleChange6 = (event) => {
        if (event.target.value === null){
            setCountry('');
        } else {
            setCountry(event.target.value);
        }
    };
    const handleChange7 = (event) => {
        if (event.target.value === null){
            setPostalCode('');
        } else {
            setPostalCode(event.target.value);
        }
    };


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
            <div class="profile">
            <h1 class="profile_title">User Profile</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Email</h3>
                    <input type="text" value={email} onChange={handleChange1} required/>

                    <h3>Username</h3>
                    <input type="text" value={username} onChange={handleChange3} />

                    <h3>Password</h3>
                    <input type="password" value={password} onChange={handleChange2} required/>

                    <h3>Phone</h3>
                    <input type="text" value={phone} onChange={handleChange4} />

                    <h3>Address</h3>
                    <input type="text" value={address} onChange={handleChange5} />

                    <h3>Country</h3>
                    <input type="text" value={country} onChange={handleChange6} />

                    <h3>Postal Code</h3>
                    <input type="text" value={postalcode} onChange={handleChange7} />
                
                    <div class="signup_login">
                        <input type="submit" value="Save Changes"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;

// <div class="update_profile">
//     <h1 class="update_profile_title">Edit profile data</h1>

//     <!--Log in form goes here------------------------------------->
//     <form method="POST">
//         <div class="input_field">
//             <span class="update_field_title">Email address</span>
//             <span><input type="text" name="email"></span>
//         </div>
//         <div class="input_field">
//             <span>Username</span>
//             <span><input type="text" name="username"></span>
//         </div>
//         <div class="input_field">
//             <span>Phone</span>
//             <span><input type="text" name="phone"></span>         
//         </div>
//         <div class="input_field">
//             <span>Street Address</span>
//             <span><input type="text" name="address"></span> 
//         </div>
//         <div class="input_field">
//             <span>Country</span>
//             <span><input type="text" name="country"></span> 
//         </div>
//         <div class="input_field">
//             <span>Postal Code</span>
//             <span><input type="text" name="postalcode"></span> 
//         </div>
//         <div class="profile_update_submit">
//             <input type="submit" value="Submit">
//         </div>
//     </form>

// </div>