import React, { useState,useEffect } from "react";
import './App.css';
import Index from './Components/Index';
import CreateAcc from './Components/Createacc';
import EnterSkills from './Components/EnterSkills';
import EnterCV from './Components/Entercv';
import EnterManual from './Components/Entermanual';
import Login from './Components/Login';
import Home from './Components/Home';
import Learn from './Components/Learn';
import Profile from './Components/Profile';
import { Routes, Route } from "react-router-dom";

function App(){
    return(
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/createacc" element={<CreateAcc/>}/>
            <Route path="/enterskills" element={<EnterSkills/>}/>
            <Route path="/entercv" element={<EnterCV/>}/>
            <Route path="/entermanual" element={<EnterManual/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/learn" element={<Learn/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    );
}

export default App;