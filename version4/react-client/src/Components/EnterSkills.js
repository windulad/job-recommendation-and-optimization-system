import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const SERVER_URL = 'http://127.0.0.1:5000';

function EnterSkills(){
    const navigate = useNavigate();

    // receive session_value
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;
    console.log(session_value)

    // send session_value
    const data = { user_id: session_value };

    const handleclick4 = () => {
        navigate('/entercv',  {state: data});
    }

    const handleclick5 = () => {
        navigate('/entermanual/get',  {state: data});
    }

    return(
        <div>
            <h1 class="enterskills_title">Enter Your Skills</h1>
            <h4 class="enterskills_subtitle">Select a method to enter your skills</h4>
            <div class="card1" style={{float:"left"}}>
                <div class="container">
                    <h1>Upload CV</h1>
                    <p>
                        Upload your CV or Resume directly to our platform. We will process your CV/Resume and your skills will be displayed in your profile. Your displayed skills can be edited later.
                    </p>
                    <div class="enter_skills">
                        <a onClick={handleclick4}><input type="submit" value="Proceed"/></a>
                    </div>
                </div>
            </div>

            <div class="card2" style={{float:"right"}}>
                <div class="container">
                    <h1>Enter manually</h1>
                    <p>
                        Enter your skills directly to our system through the dropdown menus. You can add multiple skills, and your skills will be displayed in your profile, which can be edited later
                    </p>
                    <div class="enter_skills">
                        <a onClick={handleclick5}><input type="submit" value="Proceed"/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterSkills;