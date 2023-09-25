import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

Axios.defaults.withCredentials = true;

function CrossCheck(){
    const [responseData, setResponseData] = useState(null);

    const [sessionVal, setSessionVal] = useState(null);

    const navigate = useNavigate();

    // session_value from 'Enterskills.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;
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

    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [skill4, setSkill4] = useState('');
    const [skill5, setSkill5] = useState('');
    const [skill6, setSkill6] = useState('');
    const [skill7, setSkill7] = useState('');
    const [skill8, setSkill8] = useState('');
    const [skill9, setSkill9] = useState('');
    const [skill10, setSkill10] = useState('');
    const [skill11, setSkill11] = useState('');
    const [skill12, setSkill12] = useState('');
    const [skill13, setSkill13] = useState('');
    const [skill14, setSkill14] = useState('');
    const [skill15, setSkill15] = useState('');
    const [skill16, setSkill16] = useState('');
    const [skill17, setSkill17] = useState('');
    const [skill18, setSkill18] = useState('');
    const [skill19, setSkill19] = useState('');
    const [skill20, setSkill20] = useState('');
    const [skill21, setSkill21] = useState('');
    const [skill22, setSkill22] = useState('');
    const [skill23, setSkill23] = useState('');
    const [skill24, setSkill24] = useState('');
    const [skill25, setSkill25] = useState('');
    const [skill26, setSkill26] = useState('');
    const [skill27, setSkill27] = useState('');
    const [skill28, setSkill28] = useState('');
    const [skill29, setSkill29] = useState('');
    const [skill30, setSkill30] = useState('');
    const [skill31, setSkill31] = useState('');
    const [skill32, setSkill32] = useState('');
    const [skill33, setSkill33] = useState('');
    const [skill34, setSkill34] = useState('');
    const [skill35, setSkill35] = useState('');
    const [skill36, setSkill36] = useState('');
    const [skill37, setSkill37] = useState('');
    const [skill38, setSkill38] = useState('');
    const [skill39, setSkill39] = useState('');
    const [skill40, setSkill40] = useState('');
    const [skill41, setSkill41] = useState('');
    const [skill42, setSkill42] = useState('');
    const [skill43, setSkill43] = useState('');
    const [skill44, setSkill44] = useState('');
    const [skill45, setSkill45] = useState('');
    const [skill46, setSkill46] = useState('');
    const [skill47, setSkill47] = useState('');
    const [skill48, setSkill48] = useState('');
    const [skill49, setSkill49] = useState('');
    const [skill50, setSkill50] = useState('');

    const pass_data = { 
        value: session_value,
    };

    // Triggers onload
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/crosscheck/get', pass_data, { withCredentials: true });
                // GET message from server
                const getmessage = response.data[0]['message'];
                console.log(getmessage)
                setResponseData(getmessage); 

                // GET session_value from server(user_id)
                const getsession_value = response.data[0]['session_value'];
                console.log(getsession_value)
                setSessionVal(getsession_value);

                console.log(response.data)
                
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
                const skill1 = response.data[0]['skill1'];
                const skill2 = response.data[0]['skill2'];
                const skill3 = response.data[0]['skill3'];
                const skill4 = response.data[0]['skill4'];
                const skill5 = response.data[0]['skill5'];
                const skill6 = response.data[0]['skill6'];
                const skill7 = response.data[0]['skill7'];
                const skill8 = response.data[0]['skill8'];
                const skill9 = response.data[0]['skill9'];
                const skill10 = response.data[0]['skill10'];
                const skill11 = response.data[0]['skill11'];
                const skill12 = response.data[0]['skill12'];
                const skill13 = response.data[0]['skill13'];
                const skill14 = response.data[0]['skill14'];
                const skill15 = response.data[0]['skill15'];
                const skill16 = response.data[0]['skill16'];
                const skill17 = response.data[0]['skill17'];
                const skill18 = response.data[0]['skill18'];
                const skill19 = response.data[0]['skill19'];
                const skill20 = response.data[0]['skill20'];
                const skill21 = response.data[0]['skill21'];
                const skill22 = response.data[0]['skill22'];
                const skill23 = response.data[0]['skill23'];
                const skill24 = response.data[0]['skill24'];
                const skill25 = response.data[0]['skill25'];
                const skill26 = response.data[0]['skill26'];
                const skill27 = response.data[0]['skill27'];
                const skill28 = response.data[0]['skill28'];
                const skill29 = response.data[0]['skill29'];
                const skill30 = response.data[0]['skill30'];
                const skill31 = response.data[0]['skill31'];
                const skill32 = response.data[0]['skill32'];
                const skill33 = response.data[0]['skill33'];
                const skill34 = response.data[0]['skill34'];
                const skill35 = response.data[0]['skill35'];
                const skill36 = response.data[0]['skill36'];
                const skill37 = response.data[0]['skill37'];
                const skill38 = response.data[0]['skill38'];
                const skill39 = response.data[0]['skill39'];
                const skill40 = response.data[0]['skill40'];
                const skill41 = response.data[0]['skill41'];
                const skill42 = response.data[0]['skill42'];
                const skill43 = response.data[0]['skill43'];
                const skill44 = response.data[0]['skill44'];
                const skill45 = response.data[0]['skill45'];
                const skill46 = response.data[0]['skill46'];
                const skill47 = response.data[0]['skill47'];
                const skill48 = response.data[0]['skill48'];
                const skill49 = response.data[0]['skill49'];
                const skill50 = response.data[0]['skill50'];

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
                setSkill1(skill1);
                setSkill2(skill2);
                setSkill3(skill3);
                setSkill4(skill4);
                setSkill5(skill5);
                setSkill6(skill6);
                setSkill7(skill7);
                setSkill8(skill8);
                setSkill9(skill9);
                setSkill10(skill10);
                setSkill11(skill11);
                setSkill12(skill12);
                setSkill13(skill13);
                setSkill14(skill14);
                setSkill15(skill15);
                setSkill16(skill16);
                setSkill17(skill17);
                setSkill18(skill18);
                setSkill19(skill19);
                setSkill20(skill20);
                setSkill21(skill21);
                setSkill22(skill22);
                setSkill23(skill23);
                setSkill24(skill24);
                setSkill25(skill25);
                setSkill26(skill26);
                setSkill27(skill27);
                setSkill28(skill28);
                setSkill29(skill29);
                setSkill30(skill30);
                setSkill31(skill31);
                setSkill32(skill32);
                setSkill33(skill33);
                setSkill34(skill34);
                setSkill35(skill35);
                setSkill36(skill36);
                setSkill37(skill37);
                setSkill38(skill38);
                setSkill39(skill39);
                setSkill40(skill40);
                setSkill41(skill41);
                setSkill42(skill42);
                setSkill43(skill43);
                setSkill44(skill44);
                setSkill45(skill45);
                setSkill46(skill46);
                setSkill47(skill47);
                setSkill48(skill48);
                setSkill49(skill49);
                setSkill50(skill50);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // form input handlers
    const handleChange1 = (event) => {
        setSelectedQualify1(event.target.value);
    };
    const handleChange2 = (event) => {
        setSelectedQualify1Syear(event.target.value);
    };
    const handleChange3 = (event) => {
        setSelectedQualify1Eyear(event.target.value);
    };
    const handleChange5 = (event) => {
        setSelectedQualify2(event.target.value);
    };
    const handleChange6 = (event) => {
        setSelectedQualify2Syear(event.target.value);
    };
    const handleChange7 = (event) => {
        setSelectedQualify2Eyear(event.target.value);
    };
    const handleChange9 = (event) => {
        setSelectedQualify3(event.target.value);
    };
    const handleChange10 = (event) => {
        setSelectedQualify3Syear(event.target.value);
    };
    const handleChange11 = (event) => {
        setSelectedQualify3Eyear(event.target.value);
    };
    const handleChange13 = (event) => {
        setProject1Title(event.target.value);
    };
    const handleChange15 = (event) => {
        setProject2Title(event.target.value);
    };
    const handleChange17 = (event) => {
        setProject3Title(event.target.value);
    };
    const handleChange19 = (event) => {
        setJob1(event.target.value);
    };
    const handleChange20 = (event) => {
        setJob1Syear(event.target.value);
    };
    const handleChange21 = (event) => {
        setJob1Eyear(event.target.value);
    };
    const handleChange23 = (event) => {
        setJob2(event.target.value);
    };
    const handleChange24 = (event) => {
        setJob2Syear(event.target.value);
    };
    const handleChange25 = (event) => {
        setJob2Eyear(event.target.value);
    };
    const handleChange27 = (event) => {
        setJob3(event.target.value);
    };
    const handleChange28 = (event) => {
        setJob3Syear(event.target.value);
    };
    const handleChange29 = (event) => {
        setJob3Eyear(event.target.value);
    };

    //const [postdata, setPostData] = useState(null);



    const postData = { 
        value: session_value,
        qualify_1: selectedQualify1,
        qualify_1_syear: selectedQualify1Syear,
        qualify_1_eyear: selectedQualify1Eyear, 
        qualify_2: selectedQualify2,
        qualify_2_syear: selectedQualify2Syear,
        qualify_2_eyear: selectedQualify2Eyear, 
        qualify_3: selectedQualify3,
        qualify_3_syear: selectedQualify3Syear,
        qualify_3_eyear: selectedQualify3Eyear, 
        project_1_title: project1Title,
        project_2_title: project2Title,
        project_3_title: project3Title,
        job_1: job1,
        job_1_syear: job1Syear,
        job_1_eyear: job1Eyear,
        job_2: job2,
        job_2_syear: job2Syear,
        job_2_eyear: job2Eyear,
        job_3: job3,
        job_3_syear: job3Syear,
        job_3_eyear: job3Eyear,
    };

    // Triggered on form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.post(SERVER_URL+'/crosscheck/post', postData, { withCredentials: true });
            // GET message from server
            const message = response.data.message;
            console.log(message)

            // GET session_value from server(user_id)
            const session_value = response.data.session_value;
            console.log(session_value)

            setResponseData(response.data);

            // POST session_value to 'Crosscheck.js'
            const data = { user_id: session_value };

            if (message === 'error-9'){
                navigate('/crosscheck/get',  {state: data});
            }else if(message === 'success-9'){
                navigate('/home',  {state: data});
            }
        } catch (error) {
            console.error(error);
        }
    }

 

    return(
        <div className="container">
            <form id="crossCheckForm" onSubmit={handleSubmit}>
                
                <h2 className="crosscheckl_title">Personal Bio Data</h2>
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

                <h2 className="crosscheckl_title">Educational Qualifications</h2>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Qualification No. 1</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify1} onChange={handleChange1}>
                            <option value="">Select a Qualification</option>
                            <option value="High school">High school</option>
                            <option value="Vocational qualification">Vocational qualification</option>
                            <option value="Bachelor's degree">Bachelor's degree</option>
                            <option value="Master's degree">Master's degree</option>
                            <option value="Doctorate or higher">Doctorate or higher</option>
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify1Syear} onChange={handleChange2}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify1Eyear} onChange={handleChange3}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Qualification No. 2</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify2} onChange={handleChange5}>
                            <option value="">Select a Qualification</option>
                            <option value="High school">High school</option>
                            <option value="Vocational qualification">Vocational qualification</option>
                            <option value="Bachelor's degree">Bachelor's degree</option>
                            <option value="Master's degree">Master's degree</option>
                            <option value="Doctorate or higher">Doctorate or higher</option>
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify2Syear} onChange={handleChange6}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify2Eyear} onChange={handleChange7}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Qualification No. 3</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify3} onChange={handleChange9}>
                            <option value="">Select a Qualification</option>
                            <option value="High school">High school</option>
                            <option value="Vocational qualification">Vocational qualification</option>
                            <option value="Bachelor's degree">Bachelor's degree</option>
                            <option value="Master's degree">Master's degree</option>
                            <option value="Doctorate or higher">Doctorate or higher</option>
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify3Syear} onChange={handleChange10}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={selectedQualify3Eyear} onChange={handleChange11}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>

                <h2 className="crosscheckl_title">Project Details</h2>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Project No. 1</label>
                        <input type="text" class="form-control" value={project1Title} onChange={handleChange13}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Project No. 2</label>
                        <input type="text" class="form-control" value={project2Title} onChange={handleChange15}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Project No. 3</label>
                        <input type="text" class="form-control" value={project3Title} onChange={handleChange17}/>
                    </div>
                </div>

                <h2 className="crosscheckl_title">Job Experience</h2>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Position No. 1</label>
                        <input type="text" class="form-control" value={job1} onChange={handleChange19}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={job1Syear} onChange={handleChange20}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={job1Eyear} onChange={handleChange21}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Position No. 2</label>
                        <input type="text" class="form-control" value={job2} onChange={handleChange23}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={job2Syear} onChange={handleChange24}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={job2Eyear} onChange={handleChange25}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <label className="form-label">Position No. 3</label>
                        <input type="text" class="form-control" value={job3} onChange={handleChange27}/>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year started</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={job3Syear} onChange={handleChange28}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                    <div className="col input_data">
                        <label className="form-label">Year Ended</label>
                        <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', borderColor:'black'}} value={job3Eyear} onChange={handleChange29}>
                            <option value="">Select a year</option>
                            {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>

                <h2 className="crosscheckl_title">Technologies (Skills)</h2>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill1}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill2}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill3}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill4}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill5}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill6}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill7}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill8}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill9}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill10}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill11}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill12}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill13}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill14}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill15}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill16}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill17}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill18}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill19}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill20}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill21}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill22}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill23}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill24}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill25}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill26}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill27}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill28}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill29}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill30}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill31}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill32}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill33}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill34}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill35}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill36}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill37}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill38}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill39}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill40}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill41}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill42}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill43}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill44}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill45}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill46}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill47}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill48}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill49}/>
                    </div>
                    <div className="col input_data">
                        <input type="text" class="form-control-plaintext" value={skill50}/>
                    </div>
                </div>


                <div className="row">
                    <div className="col input_data">
                        <input type="checkbox" value="" id="invalidCheck" required/>
                        <label class="form-check-label" for="invalidCheck">
                            I here by consent that all the data mentioned here are correct as my knowledge and understanding. By clicking here, I state that I have read<br/> and understood the terms and conditions.
                        </label>
                        <div class="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col crossCheckSubmit" id="crossCheckSubmit">
                        <input type="submit" value="Submit"/>
                    </div>
                </div>
                
            </form>
        </div>
    );
};

export default CrossCheck;

//<input type="text" class="form-control-plaintext" value={email}/>