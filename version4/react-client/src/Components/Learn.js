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
    const itemsPerPage = 20; // Number of items per page

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
                console.log(message)

                // GET session_value from server(user_id)
                const session_value = response.data[0]['session_value'];
                console.log(session_value)

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
                    <a class="navbar-brand" href="#">Navbar</a>
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

                    <main class="col-md-8">                   
                        <div className="main_box">
                            <div class="row">
                                {currentItems.map((element) => {
                                    return(
                                        <div class="col-md-4">
                                            <div class="card" style={{width: "100%"}}>
                                                <img class="card-img-top" img src={index2} alt="Card image cap"/>
                                                <div class="card-body" style={{height: "180px"}}>
                                                    <h6 class="card-subtitle mb-2 text-muted">{element.skill}</h6>
                                                    <h5 class="card-title mb-2">{element.tutor}</h5>
                                                    </div>
                                                <div class="card-footer">
                                                    <p class="card-subtitle mb-2">Start Learning in <a href={element.url} target="_blank" class="card-link">{element.platform}</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })};
                            </div>
                        </div>
                    </main>

                    <aside class="sidebar sidebar-right col-md-2 mt-1">
                        <div class="card">
                            <div class="card-body mb-2">
                                <h3 class="card-title">Hello {fname} !!!</h3>
                                <h6 class="card-subtitle mb-3 text-muted">Welcome to 'FUTURE'</h6>
                                <h6 class="card-subtitle mb-1 text-muted">You are eligible for...</h6>
                                {user_miss.map((element) => {
                                    return(
                                        <div class="card">{element}</div>
                                    )
                                })}
                                <a class="card-link" onClick={handleclick1}>Learn</a>
                            </div>
                        </div>
                    </aside>
                    
                    {/*<main class="col-md-10">                   
                        <div className="main_box">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="card" style={{width: "100%"}}>
                                        <img class="card-img-top" img src={index2} alt="Card image cap"/>
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card" style={{width: "100%"}}>
                                        <img class="card-img-top" img src={index2} alt="Card image cap"/>
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card" style={{width: "100%"}}>
                                        <img class="card-img-top" img src={index2} alt="Card image cap"/>
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card" style={{width: "100%"}}>
                                        <img class="card-img-top" img src={index2} alt="Card image cap"/>
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {responseData.map((element) => {
                                return(
                                    <div class="card float-left mb-2">
                                        <div class="card-body">
                                            <h6 class="card-subtitle mb-2 text-muted">{element.skill}</h6>
                                            <h2 class="card-title mb-2">{element.tutor}</h2>
                                            <p class="card-subtitle mb-2">Apply via {element.platform} <a href={element.url} target="_blank" class="card-link">Click here!</a></p>
                                        </div>
                                    </div>
                                );
                            })};
                        </div>

                        </main>*/}
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

/*{responseData && (
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
    )}*/
