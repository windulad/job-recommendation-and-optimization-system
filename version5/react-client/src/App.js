import React, { useState,useEffect } from "react";
import './App.css';
import Index from './Components/Index';
import CreateAcc from './Components/Createacc';
import Login from './Components/Login';
import EnterSkills from './Components/EnterSkills';
import EnterCV from './Components/Entercv';
import EnterManual from './Components/Entermanual';
import CrossCheck from "./Components/Crosscheck";
import Home from './Components/Home';
import Learn from './Components/Learn';
import Profile from './Components/Profile';
import { Routes, Route } from "react-router-dom";

function App(){
    return(
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/createacc" element={<CreateAcc/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/enterskills" element={<EnterSkills/>}/>
            <Route path="/entercv" element={<EnterCV/>}/>
            <Route path="/entermanual/get" element={<EnterManual/>}/>
            <Route path="/crosscheck/get" element={<CrossCheck/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/learn" element={<Learn/>}/>
            <Route path="/profile/get" element={<Profile/>}/>
        </Routes>
    );
}

export default App;