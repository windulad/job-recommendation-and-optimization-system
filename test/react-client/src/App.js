import React, { useState, useEffect } from 'react'

function App(){
    // State variable
    // data: Variable to store the state
    // setData: Function to manipulate the state of data variable
    const [data, setData] = useState([{}])

    // Fetch data from '/members' route
    // res: Store the response from backend in a json object
    // data: Set the 'json object data' to data variable
    useEffect(() => {
        fetch("/members").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    return(
	    <div>
            {(typeof data.members === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                data.members.map((member, i) => (
                    <p key={i}>{member}</p>
                ))
            )}
	    </div>
    )
}

export default App