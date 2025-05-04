import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CollectionPage() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/cards')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCards(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading cards...</div>;
    }

    if (error) {
        return <div>Error loading cards: {error.message}</div>;
    }

    return (
        <div className="collection-page">
            <Link to="/home" className="back-to-home-button">
                Back to Home
            </Link>
            <h1>Your Collection</h1>
            <div className="card-grid">
                {cards.map(card => (
                    <div key={card.id} className="card-container">
                        <Link to={`/card-details/${card.id}`} className="card-link">
                            <div className="card-item">
                                <img src={`http://localhost:5000${card.image_url}`} alt={card.name} style={{ maxWidth: '200px', height: 'auto' }} />
                                {/* <div className="card-name">{card.name}</div> */}
                            </div>
                        </Link>
                        <Link to={`/card-details/${card.id}`} className="card-details-button-link">
                            <button className="card-details-button">{card.name}</button>
                        </Link>
                    </div>
                ))}
            </div>
            <Link to="/add-card" className='add-card-button'>
                <button>Add New Card</button>
            </Link>
        </div>
    );
}

export default CollectionPage;