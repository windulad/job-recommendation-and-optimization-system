import React from 'react';

const Card = (props) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', props.cardId);
    };

    return(
        <div 
            draggable 
            onDragStart={handleDragStart}
            className='card'
            style={{ width: '150px', height: '50px' }}
        >
            {props.children}
        </div>
    );
};

export default Card;

// style={{ 
//     padding: '8px', 
//     border: '1px solid #ccc', 
//     marginBottom: '4px',
//     width: '200px'
// }}