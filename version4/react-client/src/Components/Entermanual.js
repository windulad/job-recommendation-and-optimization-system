import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

Axios.defaults.withCredentials = true;

function EnterManual(){
    const [responseData, setResponseData] = useState(null);

    const [postdata, setPostData] = useState(null);

    const navigate = useNavigate();

    // GET session_value from 'Enterskills.js'
    const location = useLocation();
    const { state } = location;
    //const obj_data = { session_value: state.user_id };

    
    // triggered when the form is submitted
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.post(SERVER_URL+'/enter_manual', postdata, { withCredentials: true });
            // GET message from server
            const message = response.data.message;
            console.log(message)

            // GET session_value from server(user_id)
            const session_value = response.data.session_value;
            console.log(session_value)

            setResponseData(response.data);

            // POST session_value to 'Home.js'
            const data = { user_id: session_value };

            if (message === 'error-5'){
                navigate('/entermanual',  {state: data});
            }else if(message === 'success-5'){
                navigate('/home',  {state: data});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}

export default EnterManual;


// function EnterManual(){
//     const [message, setMessage] = useState('');
//     const [responseData, setResponseData] = useState(null);

//     const [postdata, setPostData] = useState(null);

//     const navigate = useNavigate();

//     // GET session_value from 'Enterskills.js'
//     const location = useLocation();
//     const { state } = location;
//     const obj_data = { session_value: state.user_id };
    

//     const [checkboxes, setCheckboxes] = useState({
//         //Software engineer
//         C: false,
//         Cpp: false,
//         Csharp: false,
//         Java: false,
//         Python: false,
//         PHP: false,
//         Go: false,
//         SQL: false,
//         MySQL: false,
//         PostgreSQL: false,
//         MongoDB: false,
//         SQLServer: false,
//         OracleSQL: false,
//         Git: false,
//         GitHub: false,
//         GitLab: false,
//         AWS: false,
//         Azure: false,
//         GCP: false,
//         Postman: false,
//         Twilio: false,
//         Docker: false,
//         Kubernetes: false,
//         //front-end engineer
//         HTML: false,
//         CSS: false,
//         Bootstrap: false,
//         Tailwind: false,
//         JavaScript: false,
//         TypeScript: false,
//         React: false,
//         Angular: false,
//         Vue: false,
//         //back-end engineer
//         Node: false,
//         Django: false,
//         Flask: false,
//         SpringBoot: false,
//         Laravel: false,
//         RubyOnRails: false,
//         DotNETCore: false,
//         //android engineer
//         Dart: false,
//         Flutter: false,
//         ReactNative: false,
//         Kotlin: false,
//         AndroidJetpack: false,
//         AndroidStudio: false,
//         //ios engineer
//         Swift: false,
//         SwiftUI: false,
//         Ionic: false,
//         Xamarin: false,
//         MicrosoftPowerApps: false
//     });

    
//     // called whenever a checkbox is toggled
//     const handleCheckboxChange = (event) => {
//         const { name, checked } = event.target;
//         setCheckboxes((prevCheckboxes) => ({
//             ...prevCheckboxes,
//             [name]: checked,
//         }));
//         const post_data = { ...checkboxes,...obj_data };
//         setPostData(post_data)
//     };

    

//     // triggered when the form is submitted
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await Axios.post(SERVER_URL+'/enter_manual', postdata, { withCredentials: true });
//             // GET message from server
//             const message = response.data.message;
//             console.log(message)

//             // GET session_value from server(user_id)
//             const session_value = response.data.session_value;
//             console.log(session_value)

//             setResponseData(response.data);

//             // POST session_value to 'Home.js'
//             const data = { user_id: session_value };

//             if (message === 'error-5'){
//                 navigate('/entermanual',  {state: data});
//             }else if(message === 'success-5'){
//                 navigate('/home',  {state: data});
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return(
//         <div>
//             <form onSubmit={handleSubmit} name="form_enter_manual" id="form_enter_manual">
//                 <div class="enter_manual_skills">
//                     <h2 class="enter_manual_subtitle">Software Engineer</h2>
//                     <div>
//                         <label class="enter_manual_label">C<input type="checkbox" name="C" checked={checkboxes.C} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">C++<input type="checkbox" name="Cpp" checked={checkboxes.Cpp} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">C#<input type="checkbox" name="Csharp" checked={checkboxes.Csharp} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Java<input type="checkbox" name="Java" checked={checkboxes.Java} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Python<input type="checkbox" name="Python" checked={checkboxes.Python} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">PHP<input type="checkbox" name="PHP" checked={checkboxes.PHP} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Go<input type="checkbox" name="Go" checked={checkboxes.Go} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">SQL<input type="checkbox" name="SQL" checked={checkboxes.SQL} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">MySQL<input type="checkbox" name="MySQL" checked={checkboxes.MySQL} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">PostgreSQL<input type="checkbox" name="PostgreSQL" checked={checkboxes.PostgreSQL} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">MongoDB<input type="checkbox" name="MongoDB" checked={checkboxes.MongoDB} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">SQL Server<input type="checkbox" name="SQLServer" checked={checkboxes.SQLServer} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Oracle SQL<input type="checkbox" name="OracleSQL" checked={checkboxes.OracleSQL} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Git<input type="checkbox" name="Git" checked={checkboxes.Git} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">GitHub<input type="checkbox" name="GitHub" checked={checkboxes.GitHub} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">GitLab<input type="checkbox" name="GitLab" checked={checkboxes.GitLab} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">AWS<input type="checkbox" name="AWS" checked={checkboxes.AWS} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Azure<input type="checkbox" name="Azure" checked={checkboxes.Azure} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">GCP<input type="checkbox" name="GCP" checked={checkboxes.GCP} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Postman<input type="checkbox" name="Postman" checked={checkboxes.Postamn} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Twilio<input type="checkbox" name="Twilio" checked={checkboxes.Twilio} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Docker<input type="checkbox" name="Docker" checked={checkboxes.Docker} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Kubernetes<input type="checkbox" name="Kubernetes" checked={checkboxes.Kubernetes} onChange={handleCheckboxChange}/></label>
//                     </div>
//                 </div>
//                 <div class="enter_manual_skills">
//                     <h2 class="enter_manual_subtitle">Front-end Engineer</h2>
//                     <div>
//                         <label class="enter_manual_label">HTML<input type="checkbox" name="HTML" checked={checkboxes.HTML} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">CSS<input type="checkbox" name="CSS" checked={checkboxes.CSS} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Bootstrap<input type="checkbox" name="Bootstrap" checked={checkboxes.Bootstrap} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Tailwind<input type="checkbox" name="Tailwind" checked={checkboxes.Tailwind} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">JavaScript<input type="checkbox" name="JavaScript" checked={checkboxes.JavaScript} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">TypeScript<input type="checkbox" name="TypeScript" checked={checkboxes.TypeScript} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">React<input type="checkbox" name="React" checked={checkboxes.React} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Angular<input type="checkbox" name="Angular" checked={checkboxes.Angular} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Vue<input type="checkbox" name="Vue" checked={checkboxes.Vue} onChange={handleCheckboxChange}/></label>
//                     </div>
//                 </div>
//                 <div class="enter_manual_skills">
//                     <h2 class="enter_manual_subtitle">Back-end Engineer</h2>
//                     <div>
//                         <label class="enter_manual_label">Node<input type="checkbox" name="Node" checked={checkboxes.Node} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Django<input type="checkbox" name="Django" checked={checkboxes.Django} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Flask<input type="checkbox" name="Flask" checked={checkboxes.Flask} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">SpringBoot<input type="checkbox" name="SpringBoot" checked={checkboxes.SpringBoot} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Laravel<input type="checkbox" name="Laravel" checked={checkboxes.Laravel} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Ruby on Rails<input type="checkbox" name="RubyOnRails" checked={checkboxes.RubyOnRails} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">.NET Core<input type="checkbox" name="DotNETCore" checked={checkboxes.DotNETCore} onChange={handleCheckboxChange}/></label>
//                     </div>
//                 </div>
//                 <div class="enter_manual_skills">
//                     <h2 class="enter_manual_subtitle">Android Engineer</h2>
//                     <div>
//                         <label class="enter_manual_label">Dart<input type="checkbox" name="Dart" checked={checkboxes.Dart} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Flutter<input type="checkbox" name="Flutter" checked={checkboxes.Flutter} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">React Native<input type="checkbox" name="ReactNative" checked={checkboxes.ReactNative} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Kotlin<input type="checkbox" name="Kotlin" checked={checkboxes.Kotlin} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Android Jetpack<input type="checkbox" name="AndroidJetpack" checked={checkboxes.AndroidJetpack} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Android Studio<input type="checkbox" name="AndroidStudio" checked={checkboxes.AndroidStudio} onChange={handleCheckboxChange}/></label>
//                     </div>
//                 </div>
//                 <div class="enter_manual_skills">
//                     <h2 class="enter_manual_subtitle">IOS Engineer</h2>
//                     <div>
//                         <label class="enter_manual_label">Swift<input type="checkbox" name="Swift" checked={checkboxes.Swift} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">SwiftUI<input type="checkbox" name="SwiftUI" checked={checkboxes.SwiftUI} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Ionic<input type="checkbox" name="Ionic" checked={checkboxes.Ionic} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Xamarin<input type="checkbox" name="Xamarin" checked={checkboxes.Xamarin} onChange={handleCheckboxChange}/></label>
//                         <label class="enter_manual_label">Microsoft Power Apps<input type="checkbox" name="MicrosoftPowerApps" checked={checkboxes.MicrosoftPowerApps} onChange={handleCheckboxChange}/></label>
//                     </div>
//                 </div>
//                 <div class="enter_manual_submit">
//                     <input type="submit" value="Submit"></input>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default EnterManual;