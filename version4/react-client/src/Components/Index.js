import React, { useEffect, useState } from "react";
import './Style.css';
import { useNavigate } from 'react-router-dom';
import index1 from '../assets/index/index1.png';
import index2 from '../assets/index/index2.png';
import SwingCounter from '../items/SwingCounter.js';

function Index(){
    //Homepage Navigation
    const navigate = useNavigate();

    const handleclick1 = () => {
        navigate('/createacc');
    }

    const handleclick2 = () => {
        navigate('/login');
    }


    return(
        <div>
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">FUTURE</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mb-2 mb-lg-0 ms-auto d-inline-flex justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link" onClick={handleclick1}>Sign&nbsp;Up</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={handleclick2}>Login</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="bg cover-container d-flex w-100 h-100 mx-auto flex-column">
                <div class="row">
                    <div class="col-md-12 text-left">
                    <h1 className="main-header">WELCOME TO FUTURE</h1>
                        <p className="main-subheader">Elevating Student Success through Bridging the Gap between Education and Employment</p>
                    </div>
                    <div class="col-md-12 text-left">
                        <p className="main-subheader2">Trusted by millions of companies and employees all over the world</p>
                    </div>
                </div>
            </div>



            <div class="container">
                <div class="row">
                    <div class="four col-md-3">
                        <div class="counter-box colored">
                            <SwingCounter targetValue={100} duration={5000} />
                            <p>Students</p>
                        </div>
                    </div>
                </div>
            </div>



            <div class="counter container d-flex w-100 h-100 mx-auto flex-column">
                <div class="row">
                    <div class="col-md-6 float-left">
					    <h2 className="count-header">Hundreds of<br />JOB<br />Vacancies</h2>
                        <p className="count-subheader">Upload your CV or Resume to our platform for streamlined processing and take the next step towards your dream career. Not only will your existing skills be extracted and prominently displayed on your profile, but our platform also provides personalized recommendations to help you identify and learn the skills you may be missing. Showcase your qualifications, expertise, and eagerness to grow, all in one convenient place.</p>
                    </div>
                    <div class="col-md-6">
                        <img src={index1} class="float-right" alt="..."></img>
                    </div>
                </div>
            </div>

            <div class="row">
                <div className="col-md-6">
                    <img src={index2} alt="..."></img>
                </div>
                <div className="col-md-5 count2">
                    <h2 className="count-header2">Thousands of<br />Online<br />COURSES</h2>
                    <p className="count-subheader2">Upload your CV or Resume to our platform for streamlined processing and take the next step towards your dream career. Not only will your existing skills be extracted and prominently displayed on your profile, but our platform also provides personalized recommendations to help you identify and learn the skills you may be missing. Showcase your qualifications, expertise, and eagerness to grow, all in one convenient place.</p>
                </div>
            </div>
    
                
                
                            
            <div class="container">
                <footer class="py-1 my-1">
                    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
                    </ul>
                    <p class="text-center text-muted">&copy; 2022 Company, Inc</p>
                </footer>
            </div>
                   

        </div>
    )
}

export default Index;