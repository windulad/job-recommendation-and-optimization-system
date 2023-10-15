import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import upload_image from '../assets/entercv/uploadcv.png';
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

            // POST session_value to 'Crosscheck.js'
            const data = { user_id: session_value };

            if (message === 'error-3'){
                navigate('/entercv',  {state: data});
            }else if(message === 'success-3'){
                navigate('/crosscheck/get',  {state: data});
            }
        })
        .catch(error => {
            console.error(error);
            // Handle error
        });
    };

    return (
        <div className="container-cv">
            <div className="container">
                <div className="row">
                    <div class="col-md-12 cv">
                        <h1 class="cv_title">Upload your CV/Resume</h1>
                        <p className="cv_subtitle">Only '.pdf' format is allowed. Other file formats are not accepted.</p>
                        <img 
                            src={upload_image} 
                            alt="" 
                            style={{
                                width: '20%', 
                                height: 'auto',
                                margin: '0 auto',
                                marginTop: '3%',
                                marginBottom: '3%',
                                display: 'inline-block'
                            }}
                        />
                    </div>
                    <div class="col-md-4 cv">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input 
                                    class="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    onChange={handleFileChange}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        marginBottom: '20px'
                                    }}
                                />
                            </div>
                            <div className="cv_submit" id="cv_submit">
                                <input type="submit" value="SUBMIT"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default EnterCV;