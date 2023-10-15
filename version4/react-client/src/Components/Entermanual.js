import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

Axios.defaults.withCredentials = true;

function EnterManual(){
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

    const pass_data = { 
        value: session_value,
    };

    // Triggers onload
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/enter_manual/get', pass_data, { withCredentials: true });
                // GET message from server
                const getmessage = response.data[0]['message'];
                console.log(getmessage)
                setResponseData(getmessage); 

                // GET session_value from server(user_id)
                const getsession_value = response.data[0]['session_value'];
                console.log(getsession_value)
                setSessionVal(getsession_value);

                //console.log(response.data)
                
                const fname = response.data[0]['fname'];
                const lname = response.data[0]['lname'];
                const email = response.data[0]['email'];
                const phone = response.data[0]['phone'];
                const address = response.data[0]['address'];
                const country = response.data[0]['country'];
                const postalcode = response.data[0]['postalcode'];

                setFname(fname);
                setLname(lname);
                setEmail(email);
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

    
    // handle data
    const [selectedQualify1, setSelectedQualify1] = useState('');
    const [selectedQualify1Syear, setSelectedQualify1Syear] = useState('');
    const [selectedQualify1Eyear, setSelectedQualify1Eyear] = useState('');
    const [selectedQualify1Notes, setSelectedQualify1Notes] = useState('');

    const [selectedQualify2, setSelectedQualify2] = useState('');
    const [selectedQualify2Syear, setSelectedQualify2Syear] = useState('');
    const [selectedQualify2Eyear, setSelectedQualify2Eyear] = useState('');
    const [selectedQualify2Notes, setSelectedQualify2Notes] = useState('');

    const [selectedQualify3, setSelectedQualify3] = useState('');
    const [selectedQualify3Syear, setSelectedQualify3Syear] = useState('');
    const [selectedQualify3Eyear, setSelectedQualify3Eyear] = useState('');
    const [selectedQualify3Notes, setSelectedQualify3Notes] = useState('');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index);

    const [project1Title, setProject1Title] = useState('');
    const [project1Desc, setProject1Desc] = useState('');

    const [project2Title, setProject2Title] = useState('');
    const [project2Desc, setProject2Desc] = useState('');

    const [project3Title, setProject3Title] = useState('');
    const [project3Desc, setProject3Desc] = useState('');

    const [job1, setJob1] = useState('');
    const [job1Syear, setJob1Syear] = useState('');
    const [job1Eyear, setJob1Eyear] = useState('');
    const [job1Notes, setJob1Notes] = useState('');

    const [job2, setJob2] = useState('');
    const [job2Syear, setJob2Syear] = useState('');
    const [job2Eyear, setJob2Eyear] = useState('');
    const [job2Notes, setJob2Notes] = useState('');

    const [job3, setJob3] = useState('');
    const [job3Syear, setJob3Syear] = useState('');
    const [job3Eyear, setJob3Eyear] = useState('');
    const [job3Notes, setJob3Notes] = useState('');

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
    const handleChange4 = (event) => {
        setSelectedQualify1Notes(event.target.value);
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
    const handleChange8 = (event) => {
        setSelectedQualify2Notes(event.target.value);
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
    const handleChange12 = (event) => {
        setSelectedQualify3Notes(event.target.value);
    };
    const handleChange13 = (event) => {
        setProject1Title(event.target.value);
    };
    const handleChange14 = (event) => {
        setProject1Desc(event.target.value);
    };
    const handleChange15 = (event) => {
        setProject2Title(event.target.value);
    };
    const handleChange16 = (event) => {
        setProject2Desc(event.target.value);
    };
    const handleChange17 = (event) => {
        setProject3Title(event.target.value);
    };
    const handleChange18 = (event) => {
        setProject3Desc(event.target.value);
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
    const handleChange22 = (event) => {
        setJob1Notes(event.target.value);
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
    const handleChange26 = (event) => {
        setJob2Notes(event.target.value);
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
    const handleChange30 = (event) => {
        setJob3Notes(event.target.value);
    };



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

    const postData = { 
        value: session_value,
        qualify_1: selectedQualify1,
        qualify_1_syear: selectedQualify1Syear,
        qualify_1_eyear: selectedQualify1Eyear, 
        qualify_1_notes: selectedQualify1Notes,
        qualify_2: selectedQualify2,
        qualify_2_syear: selectedQualify2Syear,
        qualify_2_eyear: selectedQualify2Eyear, 
        qualify_2_notes: selectedQualify2Notes,
        qualify_3: selectedQualify3,
        qualify_3_syear: selectedQualify3Syear,
        qualify_3_eyear: selectedQualify3Eyear, 
        qualify_3_notes: selectedQualify3Notes,
        project_1_title: project1Title,
        project_1_desc: project1Desc,
        project_2_title: project2Title,
        project_2_desc: project2Desc,
        project_3_title: project3Title,
        project_3_desc: project3Desc,
        job_1: job1,
        job_1_syear: job1Syear,
        job_1_eyear: job1Eyear,
        job_1_notes: job1Notes,
        job_2: job2,
        job_2_syear: job2Syear,
        job_2_eyear: job2Eyear,
        job_2_notes: job2Notes,
        job_3: job3,
        job_3_syear: job3Syear,
        job_3_eyear: job3Eyear,
        job_3_notes: job3Notes,
        // count: count,
        // boxContent: boxContent,
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
            const response = await Axios.post(SERVER_URL+'/enter_manual/post', postData, { withCredentials: true });
            // GET message from server
            const message = response.data.message;
            console.log(message)

            // GET session_value from server(user_id)
            const session_value = response.data.session_value;
            console.log(session_value)

            setResponseData(response.data);

            // POST session_value to 'Crosscheck.js'
            const data = { user_id: session_value };

            if (message === 'error-5'){
                navigate('/entermanual',  {state: data});
            }else if(message === 'success-5'){
                navigate('/crosscheck/get',  {state: data});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="container_cc">
        <div className="cc_content">
            <form>
                <h2 className="enter_manual_title">Personal Bio Data</h2>
                <form>
                    <div class="form-group row">
                        <label for="staticInput" class="col-sm-2 col-form-label ms-5">Full Name</label>
                        <div class="col-sm-9">
                            <input type="text" readonly class="form-control-plaintext" value={fname + " " + lname}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticInput" class="col-sm-2 col-form-label ms-5">Email address</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control-plaintext" value={email}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticInput" class="col-sm-2 col-form-label ms-5">Phone</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control-plaintext" value={phone}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticInput" class="col-sm-2 col-form-label ms-5">Permanent Address</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control-plaintext" value={address}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticInput" class="col-sm-2 col-form-label ms-5">Country</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control-plaintext" value={country}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticInput" class="col-sm-2 col-form-label ms-5">Postal Code</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control-plaintext" value={postalcode}/>
                        </div>
                    </div>
                </form>
            </form>
            <form onSubmit={handleSubmit}>
                <h2 className="enter_manual_title">Educational Qualifications</h2>
                <p>*Add your top Educational Qualifications</p>
                <table class = "table table-striped table-bordered">
                    <thead class = "table-dark">
                        <tr>
                            <th  style={{ "width":"20%" }}>Qualification</th>
                            <th  style={{ "width":"10%" }}>Start year</th>
                            <th  style={{ "width":"10%" }}>End year</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select value={selectedQualify1} onChange={handleChange1}>
                                    <option value="">Select a Qualification</option>
                                    <option value="High school">High school</option>
                                    <option value="Vocational qualification">Vocational qualification</option>
                                    <option value="Bachelor's degree">Bachelor's degree</option>
                                    <option value="Master's degree">Master's degree</option>
                                    <option value="Doctorate or higher">Doctorate or higher</option>
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify1Syear} onChange={handleChange2}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify1Eyear} onChange={handleChange3}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <textarea value={selectedQualify1Notes} onChange={handleChange4} rows="3" cols="63"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select value={selectedQualify2} onChange={handleChange5}>
                                    <option value="">Select a Qualification</option>
                                    <option value="High school">High school</option>
                                    <option value="Vocational qualification">Vocational qualification</option>
                                    <option value="Bachelor's degree">Bachelor's degree</option>
                                    <option value="Master's degree">Master's degree</option>
                                    <option value="Doctorate or higher">Doctorate or higher</option>
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify2Syear} onChange={handleChange6}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify2Eyear} onChange={handleChange7}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <textarea value={selectedQualify2Notes} onChange={handleChange8} rows="3" cols="63"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select value={selectedQualify3} onChange={handleChange9}>
                                    <option value="">Select a Qualification</option>
                                    <option value="High school">High school</option>
                                    <option value="Vocational qualification">Vocational qualification</option>
                                    <option value="Bachelor's degree">Bachelor's degree</option>
                                    <option value="Master's degree">Master's degree</option>
                                    <option value="Doctorate or higher">Doctorate or higher</option>
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify3Syear} onChange={handleChange10}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify3Eyear} onChange={handleChange11}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <textarea value={selectedQualify3Notes} onChange={handleChange12} rows="3" cols="63"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <h2 className="enter_manual_title">Project Details</h2>
                <p>*Add your project details</p>
                <table class = "table table-striped table-bordered">
                    <thead class = "table-dark">
                        <tr>
                            <th style={{ "width":"30%" }}>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><textarea value={project1Title} onChange={handleChange13} rows="3" cols="40"/></td>
                            <td><textarea value={project1Desc} onChange={handleChange14} rows="3" cols="82"/></td>
                        </tr>
                        <tr>
                            <td><textarea value={project2Title} onChange={handleChange15} rows="3" cols="40"/></td>
                            <td><textarea value={project2Desc} onChange={handleChange16} rows="3" cols="82"/></td>
                        </tr>
                        <tr>
                            <td><textarea value={project3Title} onChange={handleChange17} rows="3" cols="40"/></td>
                            <td><textarea value={project3Desc} onChange={handleChange18} rows="3" cols="82"/></td>
                        </tr>
                    </tbody>
                </table>

                <h2 className="enter_manual_title">Job Experience</h2>
                <p>*Add your Job Experience</p>
                <table class = "table table-striped table-bordered">
                    <thead class = "table-dark">
                        <tr>
                            <th style={{ "width":"30%" }}>Position</th>
                            <th style={{ "width":"10%" }}>Start year</th>
                            <th style={{ "width":"10%" }}>End year</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <textarea value={job1} onChange={handleChange19}  rows="3" cols="35"/>
                            </td>
                            <td>
                                <select value={job1Syear} onChange={handleChange20}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={job1Eyear} onChange={handleChange21}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <textarea value={job1Notes} onChange={handleChange22} rows="3" cols="50"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea value={job2} onChange={handleChange23}  rows="3" cols="35"/>
                            </td>
                            <td>
                                <select value={job2Syear} onChange={handleChange24}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={job2Eyear} onChange={handleChange25}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <textarea value={job2Notes} onChange={handleChange26} rows="3" cols="50"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea value={job3} onChange={handleChange27} rows="3" cols="35"/>
                            </td>
                            <td>
                                <select value={job3Syear} onChange={handleChange28}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={job3Eyear} onChange={handleChange29}>
                                    <option value="">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <textarea value={job3Notes} onChange={handleChange30} rows="3" cols="50"/>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="row">
                    <h2 className="enter_manual_title">Technologies</h2>

                    <div className="box col-md-6">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="item-skill">
                                    {item1InBox ? (<p className="p-card">C</p>) : (<p>_</p>)}
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
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem1InBox}>
                                    {item1InBox ? 'Remove C' : 'C'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem2InBox}>
                                    {item2InBox ? 'Remove C++' : 'C++'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem3InBox}>
                                    {item3InBox ? 'Remove C#' : 'C#'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem4InBox}>
                                    {item4InBox ? 'Remove Java' : 'Java'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem5InBox}>
                                    {item5InBox ? 'Remove Python' : 'Python'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem6InBox}>
                                    {item6InBox ? 'Remove PHP' : 'PHP'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem7InBox}>
                                    {item7InBox ? 'Remove Go' : 'Go'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem8InBox}>
                                    {item8InBox ? 'Remove SQL' : 'SQL'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem9InBox}>
                                    {item9InBox ? 'Remove MySQL' : 'MySQL'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem10InBox}>
                                    {item10InBox ? 'Remove PostgreSQL' : 'PostgreSQL'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem11InBox}>
                                    {item11InBox ? 'Remove MongoDB' : 'MongoDB'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem12InBox}>
                                    {item12InBox ? 'Remove SQL Server' : 'SQL Server'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem13InBox}>
                                    {item13InBox ? 'Remove Oracle SQL' : 'Oracle SQL'}
                                </button>
                            </div>
                            <div className="col-md-3">
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem14InBox}>
                                    {item14InBox ? 'Remove Git' : 'Git'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem15InBox}>
                                    {item15InBox ? 'Remove GitHub' : 'GitHub'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem16InBox}>
                                    {item16InBox ? 'Remove GitLab' : 'GitLab'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem17InBox}>
                                    {item17InBox ? 'Remove AWS' : 'AWS'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem18InBox}>
                                    {item18InBox ? 'Remove Azure' : 'Azure'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem19InBox}>
                                    {item19InBox ? 'Remove GCP' : 'GCP'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem20InBox}>
                                    {item20InBox ? 'Remove Postman' : 'Postman'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem21InBox}>
                                    {item21InBox ? 'Remove Twilio' : 'Twilio'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem22InBox}>
                                    {item22InBox ? 'Remove Docker' : 'Docker'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem23InBox}>
                                    {item23InBox ? 'Remove Kubernetes' : 'Kubernetes'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem24InBox}>
                                    {item24InBox ? 'Remove HTML' : 'HTML'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem25InBox}>
                                    {item25InBox ? 'Remove CSS' : 'CSS'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem26InBox}>
                                    {item26InBox ? 'Remove Bootstrap' : 'Bootstrap'}
                                </button>
                            </div>
                            <div className="col-md-3">
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem27InBox}>
                                    {item27InBox ? 'Remove Tailwind' : 'Tailwind'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem28InBox}>
                                    {item28InBox ? 'Remove JavaScript' : 'JavaScript'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem29InBox}>
                                    {item29InBox ? 'Remove TypeScript' : 'TypeScript'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem30InBox}>
                                    {item30InBox ? 'Remove React' : 'React'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem31InBox}>
                                    {item31InBox ? 'Remove Angular' : 'Angular'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem32InBox}>
                                    {item32InBox ? 'Remove Vue' : 'Vue'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem33InBox}>
                                    {item33InBox ? 'Remove Node' : 'Node'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem34InBox}>
                                    {item34InBox ? 'Remove Django' : 'Django'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem35InBox}>
                                    {item35InBox ? 'Remove Flask' : 'Flask'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem36InBox}>
                                    {item36InBox ? 'Remove Spring Boot' : 'Spring Boot'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem37InBox}>
                                    {item37InBox ? 'Remove Laravel' : 'Laravel'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem38InBox}>
                                    {item38InBox ? 'Remove Ruby on Rails' : 'Ruby on Rails'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem39InBox}>
                                    {item39InBox ? 'Remove .NET Core' : '.NET Core'}
                                </button>
                            </div>
                            <div className="col-md-3">
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem40InBox}>
                                    {item40InBox ? 'Remove Dart' : 'Dart'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem41InBox}>
                                    {item41InBox ? 'Remove Flutter' : 'Flutter'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem42InBox}>
                                    {item42InBox ? 'Remove React Native' : 'React Native'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem43InBox}>
                                    {item43InBox ? 'Remove Kotlin' : 'Kotlin'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem44InBox}>
                                    {item44InBox ? 'Remove Android Jetpack' : 'Android Jetpack'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem45InBox}>
                                    {item45InBox ? 'Remove Android Studio' : 'Android Studio'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem46InBox}>
                                    {item46InBox ? 'Remove Swift' : 'Swift'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem47InBox}>
                                    {item47InBox ? 'Remove SwiftUI' : 'SwiftUI'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem48InBox}>
                                    {item48InBox ? 'Remove Ionic' : 'Ionic'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem49InBox}>
                                    {item49InBox ? 'Remove Xcode' : 'Xcode'}
                                </button>
                                <button type="button" class="btn btn-secondary card_button" onClick={toggleItem50InBox}>
                                    {item50InBox ? 'Remove Xamarin' : 'Xamarin'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enter_manual_submit">
                    <input type="submit" value="Next"/>
                </div>
            </form>
        </div>
        </div>
    )
}

export default EnterManual;