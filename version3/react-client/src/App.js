import React, { useState,useEffect } from "react";
import './App.css';
import Home from './Components/Home';
import CreateAcc from './Components/CreateAcc';
import Login from './Components/Login';
import EnterSkills from './Components/EnterSkills'
import { Routes, Route } from "react-router-dom";

function App(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/createacc" element={<CreateAcc/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/enterskills" element={<EnterSkills/>}/>
        </Routes>
    );
}

export default App;