import React, { useState,useEffect } from "react";
import './App.css';
import Index from './Components/Index';
import CreateAcc from './Components/Createacc';
import Login from './Components/Login';
import Home from './Components/Home';
import Learn from './Components/Learn';
import EnterSkills from './Components/EnterSkills';
import EnterCV from './Components/Entercv';
import EnterManual from './Components/Entermanual';
import Profile from './Components/Profile';
import Settings from './Components/Settings';
import Logout from './Components/Logout';
import { Routes, Route } from "react-router-dom";

function App(){
    return(
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/createacc" element={<CreateAcc/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/learn" element={<Learn/>}/>
            <Route path="/enterskills" element={<EnterSkills/>}/>
            <Route path="/entercv" element={<EnterCV/>}/>
            <Route path="/entermanual" element={<EnterManual/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
    );
}

export default App;