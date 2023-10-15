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

    // Define a state variable to track whether the item is in the box.
    const [item1InBox, setItem1InBox] = useState(false);
    const [item2InBox, setItem2InBox] = useState(false);
    const [item3InBox, setItem3InBox] = useState(false);
    const [item4InBox, setItem4InBox] = useState(false);
    const [item5InBox, setItem5InBox] = useState(false);
    const [item6InBox, setItem6InBox] = useState(false);
    const [item7InBox, setItem7InBox] = useState(false);
    const [item8InBox, setItem8InBox] = useState(false);
    const [item9InBox, setItem9InBox] = useState(false);
    const [item10InBox, setItem10InBox] = useState(false);
    const [item11InBox, setItem11InBox] = useState(false);
    const [item12InBox, setItem12InBox] = useState(false);
    const [item13InBox, setItem13InBox] = useState(false);
    const [item14InBox, setItem14InBox] = useState(false);
    const [item15InBox, setItem15InBox] = useState(false);
    const [item16InBox, setItem16InBox] = useState(false);
    const [item17InBox, setItem17InBox] = useState(false);
    const [item18InBox, setItem18InBox] = useState(false);
    const [item19InBox, setItem19InBox] = useState(false);
    const [item20InBox, setItem20InBox] = useState(false);
    const [item21InBox, setItem21InBox] = useState(false);
    const [item22InBox, setItem22InBox] = useState(false);
    const [item23InBox, setItem23InBox] = useState(false);
    const [item24InBox, setItem24InBox] = useState(false);
    const [item25InBox, setItem25InBox] = useState(false);
    const [item26InBox, setItem26InBox] = useState(false);
    const [item27InBox, setItem27InBox] = useState(false);
    const [item28InBox, setItem28InBox] = useState(false);
    const [item29InBox, setItem29InBox] = useState(false);
    const [item30InBox, setItem30InBox] = useState(false);
    const [item31InBox, setItem31InBox] = useState(false);
    const [item32InBox, setItem32InBox] = useState(false);
    const [item33InBox, setItem33InBox] = useState(false);
    const [item34InBox, setItem34InBox] = useState(false);
    const [item35InBox, setItem35InBox] = useState(false);
    const [item36InBox, setItem36InBox] = useState(false);
    const [item37InBox, setItem37InBox] = useState(false);
    const [item38InBox, setItem38InBox] = useState(false);
    const [item39InBox, setItem39InBox] = useState(false);
    const [item40InBox, setItem40InBox] = useState(false);
    const [item41InBox, setItem41InBox] = useState(false);
    const [item42InBox, setItem42InBox] = useState(false);
    const [item43InBox, setItem43InBox] = useState(false);
    const [item44InBox, setItem44InBox] = useState(false);
    const [item45InBox, setItem45InBox] = useState(false);
    const [item46InBox, setItem46InBox] = useState(false);
    const [item47InBox, setItem47InBox] = useState(false);
    const [item48InBox, setItem48InBox] = useState(false);
    const [item49InBox, setItem49InBox] = useState(false);
    const [item50InBox, setItem50InBox] = useState(false);

    // Create a function to toggle the state variable when the button is clicked.
    const toggleItem1InBox = () => {
        setItem1InBox(!item1InBox);
    };
    const toggleItem2InBox = () => {
        setItem2InBox(!item2InBox);
    };
    const toggleItem3InBox = () => {
        setItem3InBox(!item3InBox);
    };
    const toggleItem4InBox = () => {
        setItem4InBox(!item4InBox);
    };
    const toggleItem5InBox = () => {
        setItem5InBox(!item5InBox);
    };
    const toggleItem6InBox = () => {
        setItem6InBox(!item6InBox);
    };
    const toggleItem7InBox = () => {
        setItem7InBox(!item7InBox);
    };
    const toggleItem8InBox = () => {
        setItem8InBox(!item8InBox);
    };
    const toggleItem9InBox = () => {
        setItem9InBox(!item9InBox);
    };
    const toggleItem10InBox = () => {
        setItem10InBox(!item10InBox);
    };
    const toggleItem11InBox = () => {
        setItem11InBox(!item11InBox);
    };
    const toggleItem12InBox = () => {
        setItem12InBox(!item12InBox);
    };
    const toggleItem13InBox = () => {
        setItem13InBox(!item13InBox);
    };
    const toggleItem14InBox = () => {
        setItem14InBox(!item14InBox);
    };
    const toggleItem15InBox = () => {
        setItem15InBox(!item15InBox);
    };
    const toggleItem16InBox = () => {
        setItem16InBox(!item16InBox);
    };
    const toggleItem17InBox = () => {
        setItem17InBox(!item17InBox);
    };
    const toggleItem18InBox = () => {
        setItem18InBox(!item18InBox);
    };
    const toggleItem19InBox = () => {
        setItem19InBox(!item19InBox);
    };
    const toggleItem20InBox = () => {
        setItem20InBox(!item20InBox);
    };
    const toggleItem21InBox = () => {
        setItem21InBox(!item21InBox);
    };
    const toggleItem22InBox = () => {
        setItem22InBox(!item22InBox);
    };
    const toggleItem23InBox = () => {
        setItem23InBox(!item23InBox);
    };
    const toggleItem24InBox = () => {
        setItem24InBox(!item24InBox);
    };
    const toggleItem25InBox = () => {
        setItem25InBox(!item25InBox);
    };
    const toggleItem26InBox = () => {
        setItem26InBox(!item26InBox);
    };
    const toggleItem27InBox = () => {
        setItem27InBox(!item27InBox);
    };
    const toggleItem28InBox = () => {
        setItem28InBox(!item28InBox);
    };
    const toggleItem29InBox = () => {
        setItem29InBox(!item29InBox);
    };
    const toggleItem30InBox = () => {
        setItem30InBox(!item30InBox);
    };
    const toggleItem31InBox = () => {
        setItem31InBox(!item31InBox);
    };
    const toggleItem32InBox = () => {
        setItem32InBox(!item32InBox);
    };
    const toggleItem33InBox = () => {
        setItem33InBox(!item33InBox);
    };
    const toggleItem34InBox = () => {
        setItem34InBox(!item34InBox);
    };
    const toggleItem35InBox = () => {
        setItem35InBox(!item35InBox);
    };
    const toggleItem36InBox = () => {
        setItem36InBox(!item36InBox);
    };
    const toggleItem37InBox = () => {
        setItem37InBox(!item37InBox);
    };
    const toggleItem38InBox = () => {
        setItem38InBox(!item38InBox);
    };
    const toggleItem39InBox = () => {
        setItem39InBox(!item39InBox);
    };
    const toggleItem40InBox = () => {
        setItem40InBox(!item40InBox);
    };
    const toggleItem41InBox = () => {
        setItem41InBox(!item41InBox);
    };
    const toggleItem42InBox = () => {
        setItem42InBox(!item42InBox);
    };
    const toggleItem43InBox = () => {
        setItem43InBox(!item43InBox);
    };
    const toggleItem44InBox = () => {
        setItem44InBox(!item44InBox);
    };
    const toggleItem45InBox = () => {
        setItem45InBox(!item45InBox);
    };
    const toggleItem46InBox = () => {
        setItem46InBox(!item46InBox);
    };
    const toggleItem47InBox = () => {
        setItem47InBox(!item47InBox);
    };
    const toggleItem48InBox = () => {
        setItem48InBox(!item48InBox);
    };
    const toggleItem49InBox = () => {
        setItem49InBox(!item49InBox);
    };
    const toggleItem50InBox = () => {
        setItem50InBox(!item50InBox);
    };

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

                setItem1InBox(skill1);
                setItem2InBox(skill2);
                setItem3InBox(skill3);
                setItem4InBox(skill4);
                setItem5InBox(skill5);
                setItem6InBox(skill6);
                setItem7InBox(skill7);
                setItem8InBox(skill8);
                setItem9InBox(skill9);
                setItem10InBox(skill10);
                setItem11InBox(skill11);
                setItem12InBox(skill12);
                setItem13InBox(skill13);
                setItem14InBox(skill14);
                setItem15InBox(skill15);
                setItem16InBox(skill16);
                setItem17InBox(skill17);
                setItem18InBox(skill18);
                setItem19InBox(skill19);
                setItem20InBox(skill20);
                setItem21InBox(skill21);
                setItem22InBox(skill22);
                setItem23InBox(skill23);
                setItem24InBox(skill24);
                setItem25InBox(skill25);
                setItem26InBox(skill26);
                setItem27InBox(skill27);
                setItem28InBox(skill28);
                setItem29InBox(skill29);
                setItem30InBox(skill30);
                setItem31InBox(skill31);
                setItem32InBox(skill32);
                setItem33InBox(skill33);
                setItem34InBox(skill34);
                setItem35InBox(skill35);
                setItem36InBox(skill36);
                setItem37InBox(skill37);
                setItem38InBox(skill38);
                setItem39InBox(skill39);
                setItem40InBox(skill40);
                setItem41InBox(skill41);
                setItem42InBox(skill42);
                setItem43InBox(skill43);
                setItem44InBox(skill44);
                setItem45InBox(skill45);
                setItem46InBox(skill46);
                setItem47InBox(skill47);
                setItem48InBox(skill48);
                setItem49InBox(skill49);
                setItem50InBox(skill50);

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
        skill1: item1InBox,
        skill2: item2InBox,
        skill3: item3InBox,
        skill4: item4InBox,
        skill5: item5InBox,
        skill6: item6InBox,
        skill7: item7InBox,
        skill8: item8InBox,
        skill9: item9InBox,
        skill10: item10InBox,
        skill11: item11InBox,
        skill12: item12InBox,
        skill13: item13InBox,
        skill14: item14InBox,
        skill15: item15InBox,
        skill16: item16InBox,
        skill17: item17InBox,
        skill18: item18InBox,
        skill19: item19InBox,
        skill20: item20InBox,
        skill21: item21InBox,
        skill22: item22InBox,
        skill23: item23InBox,
        skill24: item24InBox,
        skill25: item25InBox,
        skill26: item26InBox,
        skill27: item27InBox,
        skill28: item28InBox,
        skill29: item29InBox,
        skill30: item30InBox,
        skill31: item31InBox,
        skill32: item32InBox,
        skill33: item33InBox,
        skill34: item34InBox,
        skill35: item35InBox,
        skill36: item36InBox,
        skill37: item37InBox,
        skill38: item38InBox,
        skill39: item39InBox,
        skill40: item40InBox,
        skill41: item41InBox,
        skill42: item42InBox,
        skill43: item43InBox,
        skill44: item44InBox,
        skill45: item45InBox,
        skill46: item46InBox,
        skill47: item47InBox,
        skill48: item48InBox,
        skill49: item49InBox,
        skill50: item50InBox,
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
        <div className="container_cc">
            <div className="cc_content">
                <form id="crossCheckForm" onSubmit={handleSubmit}>
                    <h1 className="cc_title">Cross Check</h1>

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
                    <div className="row mb-5">
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
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify1} onChange={handleChange1}>
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
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify1Syear} onChange={handleChange2}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                        <div className="col input_data">
                            <label className="form-label">Year Ended</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify1Eyear} onChange={handleChange3}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col input_data">
                            <label className="form-label">Qualification No. 2</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify2} onChange={handleChange5}>
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
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify2Syear} onChange={handleChange6}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                        <div className="col input_data">
                            <label className="form-label">Year Ended</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify2Eyear} onChange={handleChange7}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col input_data">
                            <label className="form-label">Qualification No. 3</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify3} onChange={handleChange9}>
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
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify3Syear} onChange={handleChange10}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                        <div className="col input_data">
                            <label className="form-label">Year Ended</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={selectedQualify3Eyear} onChange={handleChange11}>
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
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={job1Syear} onChange={handleChange20}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                        <div className="col input_data">
                            <label className="form-label">Year Ended</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={job1Eyear} onChange={handleChange21}>
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
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={job2Syear} onChange={handleChange24}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                        <div className="col input_data">
                            <label className="form-label">Year Ended</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={job2Eyear} onChange={handleChange25}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col input_data">
                            <label className="form-label">Position No. 3</label>
                            <input type="text" class="form-control" value={job3} onChange={handleChange27}/>
                        </div>
                        <div className="col input_data">
                            <label className="form-label">Year started</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={job3Syear} onChange={handleChange28}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                        <div className="col input_data">
                            <label className="form-label">Year Ended</label>
                            <select class="btn dropdown-toggle" style={{ textAlign:"left", width:'100%', height:'50%', backgroundColor: 'white'}} value={job3Eyear} onChange={handleChange29}>
                                <option value="">Select a year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                        </div>
                    </div>

                    <h2 className="crosscheckl_title">Technologies (Skills)</h2>
                    <div class="row mb-5">
                        <div className="box col-md-6">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="item-skill">
                                        {item1InBox ? (<h6>C</h6>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item2InBox ? (<p>C++</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item3InBox ? (<p>C#</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item4InBox ? (<p>Java</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item5InBox ? (<p>Python</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item6InBox ? (<p>PHP</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item7InBox ? (<p>Go</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item8InBox ? (<p>SQL</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item9InBox ? (<p>MySQL</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item10InBox ? (<p>PostgreSQL</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item11InBox ? (<p>MongoDB</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item12InBox ? (<p>SQL Server</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item13InBox ? (<p>Oracle SQL</p>) : (<p>_</p>)}
                                    </div> 
                                </div>
                                <div className="col-md-3">
                                <div className="item-skill">
                                        {item14InBox ? (<p>Git</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item15InBox ? (<p>GitHub</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item16InBox ? (<p>GitLab</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item17InBox ? (<p>AWS</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item18InBox ? (<p>Azure</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item19InBox ? (<p>GCP</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item20InBox ? (<p>Postman</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item21InBox ? (<p>Twilio</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item22InBox ? (<p>Docker</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item23InBox ? (<p>Kubernetes</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item24InBox ? (<p>HTML</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item25InBox ? (<p>CSS</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item26InBox ? (<p>Bootstrap</p>) : (<p>_</p>)}
                                    </div> 
                                </div>
                                <div className="col-md-3">
                                <div className="item-skill">
                                        {item27InBox ? (<p>Tailwind</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item28InBox ? (<p>JavaScript</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item29InBox ? (<p>TypeScript</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item30InBox ? (<p>React</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item31InBox ? (<p>Angular</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item32InBox ? (<p>Vue</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item33InBox ? (<p>Node</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item34InBox ? (<p>Django</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item35InBox ? (<p>Flask</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item36InBox ? (<p>Spring Boot</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item37InBox ? (<p>Laravel</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item38InBox ? (<p>Ruby on Rails</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item39InBox ? (<p>.NET Core</p>) : (<p>_</p>)}
                                    </div> 
                                </div>
                                <div className="col-md-3">
                                <div className="item-skill">
                                        {item40InBox ? (<p>Dart</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item41InBox ? (<p>Flutter</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item42InBox ? (<p>React Native</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item43InBox ? (<p>Kotlin</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item44InBox ? (<p>Android Jetpack</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item45InBox ? (<p>Android Studio</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item46InBox ? (<p>Swift</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item47InBox ? (<p>SwiftUI</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item48InBox ? (<p>Ionic</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item49InBox ? (<p>Xcode</p>) : (<p>_</p>)}
                                    </div>
                                    <div className="item-skill">
                                        {item50InBox ? (<p>Xamarin</p>) : (<p>_</p>)}
                                    </div> 
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3">
                                    {/* Button to toggle the item in and out of the box */}
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem1InBox}>
                                        {item1InBox ? 'Remove C' : 'C'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem2InBox}>
                                        {item2InBox ? 'Remove C++' : 'C++'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem3InBox}>
                                        {item3InBox ? 'Remove C#' : 'C#'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem4InBox}>
                                        {item4InBox ? 'Remove Java' : 'Java'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem5InBox}>
                                        {item5InBox ? 'Remove Python' : 'Python'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem6InBox}>
                                        {item6InBox ? 'Remove PHP' : 'PHP'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem7InBox}>
                                        {item7InBox ? 'Remove Go' : 'Go'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem8InBox}>
                                        {item8InBox ? 'Remove SQL' : 'SQL'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem9InBox}>
                                        {item9InBox ? 'Remove MySQL' : 'MySQL'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem10InBox}>
                                        {item10InBox ? 'Remove PostgreSQL' : 'PostgreSQL'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem11InBox}>
                                        {item11InBox ? 'Remove MongoDB' : 'MongoDB'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem12InBox}>
                                        {item12InBox ? 'Remove SQL Server' : 'SQL Server'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem13InBox}>
                                        {item13InBox ? 'Remove Oracle SQL' : 'Oracle SQL'}
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem14InBox}>
                                        {item14InBox ? 'Remove Git' : 'Git'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem15InBox}>
                                        {item15InBox ? 'Remove GitHub' : 'GitHub'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem16InBox}>
                                        {item16InBox ? 'Remove GitLab' : 'GitLab'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem17InBox}>
                                        {item17InBox ? 'Remove AWS' : 'AWS'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem18InBox}>
                                        {item18InBox ? 'Remove Azure' : 'Azure'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem19InBox}>
                                        {item19InBox ? 'Remove GCP' : 'GCP'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem20InBox}>
                                        {item20InBox ? 'Remove Postman' : 'Postman'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem21InBox}>
                                        {item21InBox ? 'Remove Twilio' : 'Twilio'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem22InBox}>
                                        {item22InBox ? 'Remove Docker' : 'Docker'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem23InBox}>
                                        {item23InBox ? 'Remove Kubernetes' : 'Kubernetes'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem24InBox}>
                                        {item24InBox ? 'Remove HTML' : 'HTML'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem25InBox}>
                                        {item25InBox ? 'Remove CSS' : 'CSS'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem26InBox}>
                                        {item26InBox ? 'Remove Bootstrap' : 'Bootstrap'}
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem27InBox}>
                                        {item27InBox ? 'Remove Tailwind' : 'Tailwind'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem28InBox}>
                                        {item28InBox ? 'Remove JavaScript' : 'JavaScript'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem29InBox}>
                                        {item29InBox ? 'Remove TypeScript' : 'TypeScript'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem30InBox}>
                                        {item30InBox ? 'Remove React' : 'React'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem31InBox}>
                                        {item31InBox ? 'Remove Angular' : 'Angular'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem32InBox}>
                                        {item32InBox ? 'Remove Vue' : 'Vue'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem33InBox}>
                                        {item33InBox ? 'Remove Node' : 'Node'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem34InBox}>
                                        {item34InBox ? 'Remove Django' : 'Django'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem35InBox}>
                                        {item35InBox ? 'Remove Flask' : 'Flask'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem36InBox}>
                                        {item36InBox ? 'Remove Spring Boot' : 'Spring Boot'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem37InBox}>
                                        {item37InBox ? 'Remove Laravel' : 'Laravel'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem38InBox}>
                                        {item38InBox ? 'Remove Ruby on Rails' : 'Ruby on Rails'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem39InBox}>
                                        {item39InBox ? 'Remove .NET Core' : '.NET Core'}
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem40InBox}>
                                        {item40InBox ? 'Remove Dart' : 'Dart'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem41InBox}>
                                        {item41InBox ? 'Remove Flutter' : 'Flutter'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem42InBox}>
                                        {item42InBox ? 'Remove React Native' : 'React Native'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem43InBox}>
                                        {item43InBox ? 'Remove Kotlin' : 'Kotlin'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem44InBox}>
                                        {item44InBox ? 'Remove Android Jetpack' : 'Android Jetpack'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem45InBox}>
                                        {item45InBox ? 'Remove Android Studio' : 'Android Studio'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem46InBox}>
                                        {item46InBox ? 'Remove Swift' : 'Swift'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem47InBox}>
                                        {item47InBox ? 'Remove SwiftUI' : 'SwiftUI'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem48InBox}>
                                        {item48InBox ? 'Remove Ionic' : 'Ionic'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem49InBox}>
                                        {item49InBox ? 'Remove Xcode' : 'Xcode'}
                                    </button>
                                    <button type="button" class="btn card_button" style={{ color: 'white', backgroundColor: '#31437E'}} onClick={toggleItem50InBox}>
                                        {item50InBox ? 'Remove Xamarin' : 'Xamarin'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-1 form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" required/>
                        </div>

                        <div className="col-md-11">
                            <label class="form-check-label">
                                I here by consent that all the data mentioned here are correct as my knowledge and understanding. By clicking here, I state that I have read and understood the terms and conditions.
                            </label>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col cc_submit" id="cc_submit">
                            <input type="submit" value="Submit"/>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default CrossCheck;

//<input type="text" class="form-control-plaintext" value={email}/>