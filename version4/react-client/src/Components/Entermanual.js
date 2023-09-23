import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../items/Card';
import Box from '../items/Box';
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
    const [selectedQualify1, setSelectedQualify1] = useState('option0');
    const [selectedQualify1Syear, setSelectedQualify1Syear] = useState('option0');
    const [selectedQualify1Eyear, setSelectedQualify1Eyear] = useState('option0');
    const [selectedQualify1Notes, setSelectedQualify1Notes] = useState('');

    const [selectedQualify2, setSelectedQualify2] = useState('option0');
    const [selectedQualify2Syear, setSelectedQualify2Syear] = useState('option0');
    const [selectedQualify2Eyear, setSelectedQualify2Eyear] = useState('option0');
    const [selectedQualify2Notes, setSelectedQualify2Notes] = useState('');

    const [selectedQualify3, setSelectedQualify3] = useState('option0');
    const [selectedQualify3Syear, setSelectedQualify3Syear] = useState('option0');
    const [selectedQualify3Eyear, setSelectedQualify3Eyear] = useState('option0');
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
    const [job1Syear, setJob1Syear] = useState('option0');
    const [job1Eyear, setJob1Eyear] = useState('option0');
    const [job1Notes, setJob1Notes] = useState('');

    const [job2, setJob2] = useState('');
    const [job2Syear, setJob2Syear] = useState('option0');
    const [job2Eyear, setJob2Eyear] = useState('option0');
    const [job2Notes, setJob2Notes] = useState('');

    const [job3, setJob3] = useState('');
    const [job3Syear, setJob3Syear] = useState('option0');
    const [job3Eyear, setJob3Eyear] = useState('option0');
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

    // Drag N Drop]
    const [cards, setCards] = useState([
        { id: 'C', content: 'C' },
        { id: 'cpp', content: 'C++' },
        { id: 'csharp', content: 'C#' },
        { id: 'Java', content: 'Java' },
        { id: 'Python', content: 'Python' },
        { id: 'PHP', content: 'PHP' },
        { id: 'Go', content: 'Go' },
        { id: 'SQL', content: 'SQL' },
        { id: 'MySQL', content: 'MySQL' },
        { id: 'PostgreSQL', content: 'PostgreSQL' },
        { id: 'MongoDB', content: 'MongoDB' },
        { id: 'SQL Server', content: 'SQL Server' },
        { id: 'Oracle SQL', content: 'Oracle SQL' },
        { id: 'Git', content: 'Git' },
        { id: 'GitHub', content: 'GitHub' },
        { id: 'GitLab', content: 'GitLab' },
        { id: 'AWS', content: 'AWS' },
        { id: 'Azure', content: 'Azure' },
        { id: 'GCP', content: 'GCP' },
        { id: 'Postman', content: 'Postman' },
        { id: 'Twilio', content: 'Twilio' },
        { id: 'Docker', content: 'Docker' },
        { id: 'Kubernetes', content: 'Kubernetes' },
        { id: 'HTML', content: 'HTML' },
        { id: 'CSS', content: 'CSS' },
        { id: 'Bootstrap', content: 'Bootstrap' },
        { id: 'Tailwind', content: 'Tailwind' },
        { id: 'JavaScript', content: 'JavaScript' },
        { id: 'TypeScript', content: 'TypeScript' },
        { id: 'React', content: 'React' },
        { id: 'Angular', content: 'Angular' },
        { id: 'Vue', content: 'Vue' },
        { id: 'Node', content: 'Node' },
        { id: 'Django', content: 'Django' },
        { id: 'Flask', content: 'Flask' },
        { id: 'Spring Boot', content: 'Spring Boot' },
        { id: 'Laravel', content: 'Laravel' },
        { id: 'Ruby on Rails', content: 'Ruby on Rails' },
        { id: '.NET Core', content: '.NET Core' },
        { id: 'Dart', content: 'Dart' },
        { id: 'Flutter', content: 'Flutter' },
        { id: 'React Native', content: 'React Native' },
        { id: 'Kotlin', content: 'Kotlin' },
        { id: 'Android Jetpack', content: 'Android Jetpack' },
        { id: 'Android Studio', content: 'Android Studio' },
        { id: 'Swift', content: 'Swift' },
        { id: 'SwiftUI', content: 'SwiftUI' },
        { id: 'Ionic', content: 'Ionic' },
        { id: 'Xcode', content: 'Xcode' },
        { id: 'Xamarin', content: 'Xamarin' },
    ]);

    // Output box content in every dnd
    const [boxContent, setBoxContent] = useState([]);
    
    const [history, setHistory] = useState([]);

    const [postdata, setPostData] = useState(null);

    //console.log(boxContent);

    const handleCardDropped = (cardId) => {
        const card = cards.find((c) => c.id === cardId);
        if (card) {
            setBoxContent([...boxContent, card]);
            setCards(cards.filter((c) => c.id !== cardId));

            setHistory([...history, { cards, boxContent }]);

            const cardSubmitData = {
                id: cards.id,
                content: cards.content,
            }
            setPostData(cardSubmitData);
        }
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setCards(previousState.cards);
            setBoxContent(previousState.boxContent);
        
            // Remove the last state from history
            setHistory(history.slice(0, -1));
        }
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
        boxContent: boxContent,
    };

    //const post_data = {...cv_submit_data, ...postdata};

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
                navigate('/crosscheck',  {state: data});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="enter_manual">
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
                                    <option value="option0">Select a Qualification</option>
                                    <option value="option1">High school</option>
                                    <option value="option2">Vocational qualification</option>
                                    <option value="option3">Bachelor's degree</option>
                                    <option value="option4">Master's degree</option>
                                    <option value="option5">Doctorate or higher</option>
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify1Syear} onChange={handleChange2}>
                                    <option value="option0">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify1Eyear} onChange={handleChange3}>
                                    <option value="option0">Select a year</option>
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
                                    <option value="option0">Select a Qualification</option>
                                    <option value="option1">High school</option>
                                    <option value="option2">Vocational qualification</option>
                                    <option value="option3">Bachelor's degree</option>
                                    <option value="option4">Master's degree</option>
                                    <option value="option5">Doctorate or higher</option>
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify2Syear} onChange={handleChange6}>
                                    <option value="option0">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify2Eyear} onChange={handleChange7}>
                                    <option value="option0">Select a year</option>
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
                                    <option value="option0">Select a Qualification</option>
                                    <option value="option1">High school</option>
                                    <option value="option2">Vocational qualification</option>
                                    <option value="option3">Bachelor's degree</option>
                                    <option value="option4">Master's degree</option>
                                    <option value="option5">Doctorate or higher</option>
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify3Syear} onChange={handleChange10}>
                                    <option value="option0">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={selectedQualify3Eyear} onChange={handleChange11}>
                                    <option value="option0">Select a year</option>
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
                                    <option value="option0">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={job1Eyear} onChange={handleChange21}>
                                    <option value="option0">Select a year</option>
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
                                    <option value="option0">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={job2Eyear} onChange={handleChange25}>
                                    <option value="option0">Select a year</option>
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
                                    <option value="option0">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <select value={job3Eyear} onChange={handleChange29}>
                                    <option value="option0">Select a year</option>
                                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                                </select>
                            </td>
                            <td>
                                <textarea value={job3Notes} onChange={handleChange30} rows="3" cols="50"/>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h2 className="enter_manual_title">Technologies</h2>
                    <p>*Drag and drop the skills you are profficient with</p>
                    <button onClick={handleUndo} className="undo-button">
                        Undo
                    </button>
                    <div className="card-container">
                        {cards.map((card) => (
                        <Card key={card.id} cardId={card.id}>
                            {card.content}
                        </Card>
                        ))}
                        <div class="clear"></div>
                    </div>
                    <Box onCardDropped={handleCardDropped}>
                        {boxContent.map((card) => (
                        <div key={card.id} className="box-card">
                            {card.content}
                        </div>
                        ))}
                        <p style={{ 
                            textAlign:'center',
                            padding:'160px 0'
                            }}
                        >
                        Drop Here</p>
                    </Box>   
                </div>
                
                <div class="signup_login">
                    <input type="submit" value="Next"/>
                </div>
            </form>
        </div>
    )
}

export default EnterManual;