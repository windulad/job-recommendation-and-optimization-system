import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import manual_img from '../assets/enterskills/manual-img.png';
import upload_img from '../assets/enterskills/upload-img.png'

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
        <div className="container-enterskills">
            <div className="container">
                <div className="row">
                    <h1 class="enterskills_title">Enter Your Skills</h1>
                    <h4 class="enterskills_subtitle">Select your method of input</h4>
                </div>
            
                <div className="row">
                    <div className="col-md-5 card_enterskills">
                        <img 
                            src={manual_img} 
                            alt="" 
                            style={{
                                width: '53%', 
                                height: 'auto',
                                margin: '0 auto',
                                display: 'flex',
                                marginTop: '-3%',
                            }}
                        />
                        <div class="container">
                            <h1 className="enterskill_itemtitle">Complete the Resume</h1>
                            <p className="enterskill_itemcontent">
                                Enter your skills directly to our system through the dropdown menus. You can add multiple skills, and your skills will be displayed in your profile, which can be edited later
                            </p>
                            <div className="enter_skills">
                                <a onClick={handleclick5}><input type="submit" value="Proceed"/></a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-6 vertical-line"></div>
                            <div className="col-md-6"></div>
                        </div>
                        <div className="row mt-4">
                            <p className="enterskill_itemor">OR</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6 vertical-line"></div>
                            <div className="col-md-6"></div>
                        </div>
                    </div>

                    

                    <div className="col-md-5 card_enterskills">  
                        <img 
                            src={upload_img} 
                            alt="" 
                            style={{
                                width: '53%', 
                                height: 'auto',
                                margin: '0 auto',
                                display: 'flex',
                                marginTop: '-3%',
                            }}
                        />                  
                        <div class="container">
                            <h1 className="enterskill_itemtitle">Upload your CV</h1>
                            <p className="enterskill_itemcontent">
                                Upload your CV or Resume directly to our platform. We will process your CV/Resume and your skills will be displayed in your profile. Your displayed skills can be edited later.
                            </p>
                            <div className="enter_skills">
                                <a onClick={handleclick4}><input type="submit" value="Proceed"/></a>
                            </div>
                        </div>  
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default EnterSkills;