import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

Axios.defaults.withCredentials = true;

function CrossCheck(){

    return(
        <div>CrossCheck</div>
    );
};

export default CrossCheck;