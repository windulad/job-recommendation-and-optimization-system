import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

Axios.defaults.withCredentials = true;

function Home(){
    const [responseData, setResponseData] = useState(null);

    const [sessionVal, setSessionVal] = useState(null);

    const navigate = useNavigate();

    // session_value from 'Home.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;

    const pass_data = { 
        value: session_value,
    };
    //console.log(session_value)

    // handle data
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [postalcode, setPostalCode] = useState('');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index);

    const [selectedQualify1, setSelectedQualify1] = useState('');
    const [selectedQualify1Syear, setSelectedQualify1Syear] = useState('');
    const [selectedQualify1Eyear, setSelectedQualify1Eyear] = useState('');
    const [selectedQualify2, setSelectedQualify2] = useState('');
    const [selectedQualify2Syear, setSelectedQualify2Syear] = useState('');
    const [selectedQualify2Eyear, setSelectedQualify2Eyear] = useState('');
    const [selectedQualify3, setSelectedQualify3] = useState('');
    const [selectedQualify3Syear, setSelectedQualify3Syear] = useState('');
    const [selectedQualify3Eyear, setSelectedQualify3Eyear] = useState('');

    const [project1Title, setProject1Title] = useState('');
    const [project2Title, setProject2Title] = useState('');
    const [project3Title, setProject3Title] = useState('');

    const [job1, setJob1] = useState('');
    const [job1Syear, setJob1Syear] = useState('');
    const [job1Eyear, setJob1Eyear] = useState('');
    const [job2, setJob2] = useState('');
    const [job2Syear, setJob2Syear] = useState('');
    const [job2Eyear, setJob2Eyear] = useState('');
    const [job3, setJob3] = useState('');
    const [job3Syear, setJob3Syear] = useState('');
    const [job3Eyear, setJob3Eyear] = useState('');

    

    // page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/profile/get', pass_data, { withCredentials: true });
                // GET message from server
                const message = response.data[0]['message'];
                console.log(message)
                setResponseData(response.data);

                // GET session_value from server(user_id)
                const session_value = response.data[0]['session_value'];
                console.log(session_value)
                setSessionVal(session_value);

                const fname = response.data[0]['fname'];
                const lname = response.data[0]['lname'];
                const email = response.data[0]['email'];
                const phone = response.data[0]['phone'];
                const address = response.data[0]['address'];
                const country = response.data[0]['country'];
                const postalcode = response.data[0]['postalcode'];
                const selectedQualify1 = response.data[0]['qualify_1'];
                const selectedQualify1Syear = response.data[0]['qualify_1_syear'];
                const selectedQualify1Eyear = response.data[0]['qualify_1_eyear'];
                const selectedQualify2 = response.data[0]['qualify_2'];
                const selectedQualify2Syear = response.data[0]['qualify_2_syear'];
                const selectedQualify2Eyear = response.data[0]['qualify_2_eyear'];
                const selectedQualify3 = response.data[0]['qualify_3'];
                const selectedQualify3Syear = response.data[0]['qualify_3_syear'];
                const selectedQualify3Eyear = response.data[0]['qualify_3_eyear'];
                const project1Title = response.data[0]['project_1_title'];
                const project2Title = response.data[0]['project_2_title'];
                const project3Title = response.data[0]['project_3_title'];
                const job1 = response.data[0]['job_1'];
                const job1Syear = response.data[0]['job_1_syear'];
                const job1Eyear = response.data[0]['job_1_eyear'];
                const job2 = response.data[0]['job_2'];
                const job2Syear = response.data[0]['job_2_syear'];
                const job2Eyear = response.data[0]['job_2_eyear'];
                const job3 = response.data[0]['job_3'];
                const job3Syear = response.data[0]['job_3_syear'];
                const job3Eyear = response.data[0]['job_3_eyear'];
                
                setFname(fname);
                setLname(lname);
                setEmail(email);
                setPhone(phone);
                setAddress(address);
                setCountry(country);
                setPostalCode(postalcode);
                setSelectedQualify1(selectedQualify1);
                setSelectedQualify1Syear(selectedQualify1Syear);
                setSelectedQualify1Eyear(selectedQualify1Eyear);
                setSelectedQualify2(selectedQualify2);
                setSelectedQualify2Syear(selectedQualify2Syear);
                setSelectedQualify2Eyear(selectedQualify2Eyear);
                setSelectedQualify3(selectedQualify3);
                setSelectedQualify3Syear(selectedQualify3Syear);
                setSelectedQualify3Eyear(selectedQualify3Eyear);
                setProject1Title(project1Title);
                setProject2Title(project2Title);
                setProject3Title(project3Title);
                setJob1(job1);
                setJob1Syear(job1Syear);
                setJob1Eyear(job1Eyear);
                setJob2(job2);
                setJob2Syear(job2Syear);
                setJob2Eyear(job2Eyear);
                setJob3(job3);
                setJob3Syear(job3Syear);
                setJob3Eyear(job3Eyear);

                

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    
    // navigation 
    const data = { user_id: sessionVal };

    const handleclick1 = () => {
        navigate('/home',  {state: data});
    }
    const handleclick2 = () => {
        navigate('/learn',  {state: data});
    }
    const handleclick3 = () => {
        navigate('/profile/get',  {state: data});
    }
    const handleclick5 = () => {
        navigate('/');
    }


    if (responseData === null){
        return <div className="loader"></div>
    }

    return(
        <div className="container_home">
        
            <nav class="navbar navbar-expand-lg fixed-top main_navbar">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav main_nav">
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick1}>FUTURE</a>
                        </li>
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick1}>Home</a>
                        </li>
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick2}>Learn</a>
                        </li>
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick3}>Profile</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto d-inline-flex justify-content-end main_navend">
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick5}>Log&nbsp;out</a>
                        </li>
                    </ul>
                </div>
            </nav>
       

            <div className="profile">            
                <h2 className="profile_title">Personal Bio Data</h2>
                
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">First Name</label>
                        <input type="text" class="form-control" value={fname}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Last Name</label>
                        <input type="text" class="form-control" value={lname}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Email Address</label>
                        <input type="text" class="form-control" value={email}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Contact Number</label>
                        <input type="text" class="form-control" value={phone}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Permanent Address</label>
                        <input type="text" class="form-control" value={address}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Country</label>
                        <input type="text" class="form-control" value={country}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Postal Code</label>
                        <input type="text" class="form-control" value={postalcode}/>
                    </div>
                </div>

                <h2 className="profile_title">Educational Qualifications</h2>
                
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Qualification No. 1</label>
                        <input type="text" class="form-control" value={selectedQualify1}></input>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <input type="text" class="form-control" value={selectedQualify1Syear}></input>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <input type="text" class="form-control" value={selectedQualify1Eyear}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Qualification No. 2</label>
                        <input type="text" class="form-control" value={selectedQualify2}></input>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <input type="text" class="form-control" value={selectedQualify2Syear}></input>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <input type="text" class="form-control" value={selectedQualify2Eyear}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Qualification No. 3</label>
                        <input type="text" class="form-control" value={selectedQualify3}></input>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <input type="text" class="form-control" value={selectedQualify3Syear}></input>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <input type="text" class="form-control" value={selectedQualify3Eyear}></input>
                    </div>
                </div>

                <h2 className="profile_title">Project Details</h2>
                
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Project No. 1</label>
                        <input type="text" class="form-control" value={project1Title}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Project No. 2</label>
                        <input type="text" class="form-control" value={project2Title}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Project No. 3</label>
                        <input type="text" class="form-control" value={project3Title}/>
                    </div>
                </div>

                <h2 className="profile_title">Job Experience</h2>
                
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Position No. 1</label>
                        <input type="text" class="form-control" value={job1}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <input type="text" class="form-control" value={job1Syear}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <input type="text" class="form-control" value={job1Eyear}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Position No. 2</label>
                        <input type="text" class="form-control" value={job2}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <input type="text" class="form-control" value={job2Syear}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <input type="text" class="form-control" value={job2Eyear}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Position No. 3</label>
                        <input type="text" class="form-control" value={job3}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <input type="text" class="form-control" value={job3Syear}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <input type="text" class="form-control" value={job3Eyear}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
