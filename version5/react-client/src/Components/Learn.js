import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import index2 from '../assets/learn/imgphp.jpg';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const navigate = useNavigate();

    const [responseData, setResponseData] = useState(null);

    const [sessionVal, setSessionVal] = useState(null)

    const [fname, setFname] = useState('');
    const [user_miss, setUser_miss] = useState('');

    // State for items and current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50; // Number of items per page

    // To store the filter criteria
    const [filterCriteria, setFilterCriteria] = useState('');

    // GET session_value from 'Home.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;

    const pass_data = { value: session_value };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/learnpage', pass_data, { withCredentials: true });
                // GET data from server
                const learn_data = response.data;
                //console.log(learn_data);
                const learn_data_sliced = learn_data.slice(1);

                setResponseData(learn_data_sliced);

                //const position_id = responseData.0.
                
                // GET message from server
                const message = response.data[0]['message'];
                //console.log(message)

                // GET session_value from server(user_id)
                const session_value = response.data[0]['session_value'];
                //console.log(session_value)

                setSessionVal(session_value);

                const fname = response.data[0]['fname'];
                const user_miss = response.data[0]['user_miss'];

                setFname(fname);
                setUser_miss(user_miss);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const data = { user_id: sessionVal };

    const handleclick1 = () => {
        navigate('/home',  {state: data});
    }
    const handleclick2 = () => {
        navigate('/learn',  {state: data});
    }
    const handleclick3 = () => {
        navigate('/profile/get',  {state: data});
    }
    const handleclick5 = () => {
        navigate('/');
    }

    if (responseData === null){
        return <div className="loader"></div>
    }



    // Function to filter data based on the criteria
    const filteredData = responseData.filter((item) =>
        item && item.skill && item.skill.toLowerCase().includes(filterCriteria.toLowerCase())
    );

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    };

    // // Calculate the items to display on the current page
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Calculate the starting and ending indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the items to display on the current page
    const currentItems = filteredData.slice(startIndex, endIndex);




    return(
        <div className="container_home">
            
            <nav class="navbar navbar-expand-lg fixed-top main_navbar">
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav main_nav">
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick1}>FUTURE</a>
                        </li>
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick1}>Home</a>
                        </li>
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick2}>Learn</a>
                        </li>
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick3}>Profile</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto d-inline-flex justify-content-end main_navend">
                        <li class="nav-item main_navitem">
                            <a class="nav-link" onClick={handleclick5}>Log&nbsp;out</a>
                        </li>
                    </ul>
                </div>
            </nav>
            

            <div className="container-fluid container_main">
                <div className="row">
                    <aside class="sidebar sidebar-left col-md-2" style={{ 
                            backgroundColor: '#6776AB',
                            color: 'white'
                        }}>
                        <h3 className="card-title mx-3">Filter Results</h3>
                        {/* Filter input */}
                        <label>
                        <p class="card-text mx-3">Refine the search results</p>
                            <div class="form-group">
                                <input type="text" class="form-control  mb-4" value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)}/>
                            </div>
                        </label>
                    </aside>

                    <main class="col-md-7">                   
                        <div className="main_box">
                            <div class="row">
                                {currentItems.map((element) => {
                                    return(
                                        <div class="col-md-4">
                                            <div class="card" 
                                                style={{width: "100%"}}>
                                                <div class="card-body" style={{height: "220px"}}>
                                                    <h6 class="card-subtitle mb-2 text-muted">{element.skill}</h6>
                                                    <h5 class="card-title mb-2">{element.tutor}</h5>
                                                </div>
                                                <div class="card-footer"
                                                    style={{
                                                        backgroundColor: '#7796CB',
                                                        color: 'white'
                                                    }}
                                                >
                                                    <h6 class="card-text box_under mb-2">Start Learning in <a href={element.url} target="_blank" class="card-link" style={{ color: 'white' }}>{element.platform}</a></h6>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </main>

                    <aside class="sidebar sidebar-right col-md-3 mt-1">
                        <div class="card sidecard_right"
                            style={{ 
                                backgroundColor: '#6776AB',
                                color: 'white'
                            }}
                        >
                            <div class="card-body mb-2">
                                <h3 class="card-title">Hello {fname} !!!</h3>
                                <h6 class="card-subtitle mb-3">Welcome to 'FUTURE'</h6>
                                <p class="card-text">The skills that you need to be improved are as follows</p>
                                <div className="miss_box">
                                    {user_miss.map((element) => {
                                        return(
                                            <div
                                                style={{
                                                    color: 'black',
                                                    backgroundColor: 'white',
                                                    borderRadius: '5px',
                                                    width: '120px',
                                                    height: '40px',
                                                    margin: '2px',
                                                    padding: '5px',
                                                    textAlign: 'center'
                                                }}
                                            ><b>{element}</b></div>
                                        )
                                    })}
                                </div>
                                {/* <a class="card-link" onClick={handleclick1}>Learn</a> */}
                                <p class="card-text box_under">Visit <a class="card-link" onClick={handleclick1} style={{ color: 'white' }}><b>Home</b></a> to improve your skills</p>
                            </div>
                        </div>
                    </aside>
                    
                </div>
            </div>

            {/* Pagination controls */}
            <div className="container">
                <div className="row pb-4">
                    <div className="col-md-2">
                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === 1}
                        >
                            Previous Page
                        </button>
                    </div>

                    <div className="col-md-8">
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <div
                                    key={index} 
                                    className={currentPage === index + 1 ? 'active' : ''}
                                    style={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                        width: '120px',
                                        height: '40px',
                                        margin: '2px',
                                        padding: '5px',
                                        textAlign: 'center'
                                    }}
                                > {index + 1}</div>
                                ))}
                            {/* <p>Current Page: {currentPage}</p> */}
                        </ul>
                    </div>

                    <div className="col-md-2">
                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={endIndex >= filteredData.length}
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
