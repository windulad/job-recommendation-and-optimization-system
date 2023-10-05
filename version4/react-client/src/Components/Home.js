import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:5000';

function Home(){
    const navigate = useNavigate();

    //const [responseData, setResponseData] = useState(null);

    const [fname, setFname] = useState('');
    const [user_score, setUser_score] = useState('');
    const [job_1, setjob_1] = useState('');
    const [job_2, setjob_2] = useState('');
    const [job_3, setjob_3] = useState('');
    const [job_4, setjob_4] = useState('');
    const [job_5, setjob_5] = useState('');

    const [job_1_list, setjob_1_list] = useState('');
    const [job_2_list, setjob_2_list] = useState('');
    const [job_3_list, setjob_3_list] = useState('');
    const [job_4_list, setjob_4_list] = useState('');
    const [job_5_list, setjob_5_list] = useState('');

    const [renderCard1, setRenderCard1] = useState(false);
    const [renderCard2, setRenderCard2] = useState(false);
    const [renderCard3, setRenderCard3] = useState(false);
    const [renderCard4, setRenderCard4] = useState(false);
    const [renderCard5, setRenderCard5] = useState(false);

    const [sessionVal, setSessionVal] = useState(null)

    // State for items and current page
    const [responseData, setResponseData] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Number of items per page

    // To store the filter criteria
    const [filterCriteria, setFilterCriteria] = useState('');


    // GET session_value from 'Crosscheck.js'
    const location = useLocation();
    const { state } = location;
    const session_value = state.user_id;

    const pass_data = { value: session_value };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.post(SERVER_URL+'/homepage', pass_data, { withCredentials: true });
                // GET data from server
                const job_data = response.data;
                //const job_data = JSON.stringify(response.data);
                //console.log(job_data);
                const job_data_sliced = job_data.slice(1);

                setResponseData(job_data_sliced);

                //const position_id = responseData.0.
                
                // GET message from server
                const message = response.data[0]['message'];
                console.log(message)

                // GET session_value from server(user_id)
                const session_value = response.data[0]['session_value'];
                console.log(session_value)

                setSessionVal(session_value);

                const fname = response.data[0]['fname'];
                const user_score = response.data[0]['user_score'];
                const job_1 = response.data[0]['job_1'];
                const job_2 = response.data[0]['job_2'];
                const job_3 = response.data[0]['job_3'];
                const job_4 = response.data[0]['job_4'];
                const job_5 = response.data[0]['job_5'];

                setFname(fname);
                setUser_score(user_score);
                setjob_1(job_1);
                setjob_2(job_2);
                setjob_3(job_3);
                setjob_4(job_4);
                setjob_5(job_5);

                setjob_1_list(job_1[3]);
                setjob_2_list(job_2[3]);
                setjob_3_list(job_3[3]);
                setjob_4_list(job_4[3]);
                setjob_5_list(job_5[3]);

                setRenderCard1(job_1.includes(''));
                setRenderCard2(job_2.includes(''));
                setRenderCard3(job_3.includes(''));
                setRenderCard4(job_4.includes(''));
                setRenderCard5(job_5.includes(''));

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
        return <div>Loading...</div>
    }

    
    // Function to filter data based on the criteria
    const filteredData = responseData.filter((item) =>
        item && item.title && item.title.toLowerCase().includes(filterCriteria.toLowerCase())
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
        <div>
            <div>
                <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                    <a class="navbar-brand" href="">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" onClick={handleclick1}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={handleclick2}>Learn</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={handleclick3}>Profile</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav mb-2 mb-lg-0 ms-auto d-inline-flex justify-content-end">
                            <li class="nav-item ">
                                <a class="nav-link" onClick={handleclick5}>Log&nbsp;out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="container-fluid main">
                <div className="row">
                    <aside class="sidebar sidebar-left col-md-2">
                        <h2 className="sidebar-title">Filter</h2>
                        {/* Filter input */}
                        <label>
                            Filter by Name:
                            <input type="text" value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)}/>
                        </label>
                    </aside>



                    <main class="col-md-7">
                        <div className="main_box">
                            {currentItems.map((item) => {
                                return(
                                    <div class="card">
                                        <div class="card-body">
                                            <h6 class="card-subtitle mb-2 text-muted">{item.position}</h6>
                                            <h2 class="card-title mb-2">{item.title}</h2>
                                            <p class="mb-2">{item.company}, {item.location}</p>
                                            <p class="card-text mb-3">{item.summary}</p>
                                            <p class="card-subtitle mb-2">Apply via {item.platform} <a href={item.url} target="_blank" class="card-link">Click here!</a></p>
                                            <p class="card-text card-date text-muted mb-auto">{item.post_date}</p><br />
                                        </div>
                                    </div>
                                )
                            })}
                            {/*
                            {currentItems.map((element) => {
                                return(
                                    <div class="card">
                                        <div class="card-body">
                                            <h6 class="card-subtitle mb-2 text-muted">{element.position}</h6>
                                            <h2 class="card-title mb-2">{element.title}</h2>
                                            <p class="mb-2">{element.company}, {element.location}</p>
                                            <p class="card-text mb-3">{element.summary}</p>
                                            <p class="card-subtitle mb-2">Apply via {element.platform} <a href={element.url} target="_blank" class="card-link">Click here!</a></p>
                                            <p class="card-text card-date text-muted mb-auto">{element.post_date}</p><br />
                                        </div>
                                    </div>
                                )
                            })}*/}
                        </div>
                    </main>

                    <aside class="sidebar sidebar-right col-md-3 mt-1">
                        <div class="card">
                            <div class="card-body mb-2">
                                <h3 class="card-title">Hello {fname} !!!</h3>
                                <h6 class="card-subtitle mb-3 text-muted">Welcome to 'FUTURE'</h6>
                                <p class="card-text">Your user score according to the data you entered is as follows.</p>
                                <h5 class="card-subtitle">{user_score}%</h5>
                            </div>
                        </div>


                        {renderCard1 ? (
                            <p></p>
                        ) : (
                            <div class="card">
                                <div class="card-body mb-2">
                                    <h6 class="card-subtitle mb-1 text-muted">You are eligible for...</h6>
                                    <h3 class="card-title">{job_1[0]}</h3>
                                    <p class="card-text">Matching Score</p>
                                    <h5 class="card-subtitle mb-3">{job_1[1] * 100}%</h5>
                                    {job_1_list.map((element) => {
                                        return(
                                            <div class="card">{element}</div>
                                        )
                                    })}
                                    <a class="card-link" onClick={handleclick2}>Learn</a>
                                </div>
                            </div>
                        )}
                        
                        {renderCard2 ? (
                            <p></p>
                        ) : (
                            <div class="card">
                                <div class="card-body mb-2">
                                    <h6 class="card-subtitle mb-1 text-muted">You are eligible for...</h6>
                                    <h3 class="card-title">{job_2[0]}</h3>
                                    <p class="card-text">Your user score according to the data you entered is as follows.</p>
                                    <h5 class="card-subtitle mb-3">{job_2[1] * 100}%</h5>
                                    {job_2_list.map((element) => {
                                        return(
                                            <div class="card">{element}</div>
                                        )
                                    })}
                                    <a class="card-link" onClick={handleclick2}>Learn</a>
                                </div>
                            </div>
                        )}
                        
                        {renderCard3 ? (
                            <p></p>
                        ) : (
                            <div class="card">
                                <div class="card-body mb-2">
                                    <h6 class="card-subtitle mb-1 text-muted">You are eligible for...</h6>
                                    <h3 class="card-title">{job_3[0]}</h3>
                                    <p class="card-text">Your user score according to the data you entered is as follows.</p>
                                    <h5 class="card-subtitle mb-3">{job_3[1] * 100}%</h5>
                                    {job_3_list.map((element) => {
                                        return(
                                            <div class="card">{element}</div>
                                        )
                                    })}
                                    <a class="card-link" onClick={handleclick2}>Learn</a>
                                </div>
                            </div>
                        )}
                        
                        {renderCard4 ? (
                            <p></p>
                        ) : (
                            <div class="card">
                                <div class="card-body mb-2">
                                    <h6 class="card-subtitle mb-1 text-muted">You are eligible for...</h6>
                                    <h3 class="card-title">{job_4[0]}</h3>
                                    <p class="card-text">Your user score according to the data you entered is as follows.</p>
                                    <h5 class="card-subtitle mb-3">{job_4[1] * 100}%</h5>
                                    {job_4_list.map((element) => {
                                        return(
                                            <div class="card">{element}</div>
                                        )
                                    })}
                                    <a class="card-link" onClick={handleclick2}>Learn</a>
                                </div>
                            </div>
                        )}
                        
                        {renderCard5 ? (
                            <p></p>
                        ) : (
                            <div class="card">
                                <div class="card-body mb-2">
                                    <h6 class="card-subtitle mb-1 text-muted">You are eligible for...</h6>
                                    <h3 class="card-title">{job_5[0]}</h3>
                                    <p class="card-text">Your user score according to the data you entered is as follows.</p>
                                    <h5 class="card-subtitle mb-3">{job_5[1] * 100}%</h5>
                                    {job_5_list.map((element) => {
                                        return(
                                            <div class="card">{element}</div>
                                        )
                                    })}
                                    <a class="card-link" onClick={handleclick2}>Learn</a>
                                </div>
                            </div>
                        )}
                        
                    </aside>
                </div>
                
            </div>
            {/* Pagination controls */}
            <div>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </li>
                    ))}
                    <p>Current Page: {currentPage}</p>
                </ul>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= filteredData.length}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default Home;
