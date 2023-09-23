import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import Box from './Box';

function App() {
    const [cards, setCards] = useState([
        { id: 'card1', content: 'Card 1' },
        { id: 'card2', content: 'Card 2' },
    ]);

    const [boxContent, setBoxContent] = useState([]);
    const [history, setHistory] = useState([]);

    console.log(boxContent);

    const handleCardDropped = (cardId) => {
        const card = cards.find((c) => c.id === cardId);
        if (card) {
            setBoxContent([...boxContent, card]);
            setCards(cards.filter((c) => c.id !== cardId));

            setHistory([...history, { cards, boxContent }]);
        }
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setCards(previousState.cards);
            setBoxContent(previousState.boxContent);
        
            // Remove the last state from history
            setHistory(history.slice(0, -1));
        }
    };

    return (
        <div className="App">
            <h1>Drag and Drop Example</h1>
            <div className="card-container">
                {cards.map((card) => (
                <Card key={card.id} cardId={card.id}>
                    {card.content}
                </Card>
                ))}
            </div>
            <Box onCardDropped={handleCardDropped}>
                {boxContent.map((card) => (
                <div key={card.id} className="box-card">
                    {card.content}
                </div>
                ))}
            </Box>
            <button onClick={handleUndo} className="undo-button">
                Undo
            </button>
        </div>
    );
}

export default App;


