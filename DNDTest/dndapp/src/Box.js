import React from "react";

const Box = (props) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('text/plain');
        props.onCardDropped(cardId);
    };

    return(
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="box"
            
        >
            {props.children}
        </div>
    );
};

export default Box;


// style={{ 
//     width: '300px',
//     height: '300px', 
//     border: '2px dashed #000' 
// }}