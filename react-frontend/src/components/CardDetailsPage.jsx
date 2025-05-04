import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash can icon from react-icons

function CardDetailsPage() {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/cards/${cardId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCard(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [cardId]);

  if (loading) {
    return <div>Loading card details...</div>;
  }

  if (error) {
    return <div>Error loading card details: {error.message}</div>;
  }

  if (!card) {
    return <div>Card not found.</div>;
  }

  return (
    <div className="card-details-page">
      <h1 className="card-title">{card.name}</h1>
      <div className="card-info-container">
        <img src={`http://localhost:5000${card.image_url}`} alt={card.name} style={{ maxWidth: '300px', height: 'auto' }} />
        <div className="card-details">
          <p>Series: {card.series || 'N/A'}</p>
          <p>Set: {card.set || 'N/A'}</p>
          <p>Price Purchased: {card.price_purchased !== null ? `$${card.price_purchased.toFixed(2)}` : 'N/A'}</p>
          <p>Date Acquired: {card.date_acquired ? new Date(card.date_acquired).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
      <div className="card-actions">
        <button onClick={() => navigate('/collection')}>Back to Collection Page</button>
        <Link to={`/delete-card/${card.id}`}>
          <button>
            <FaTrashAlt /> Delete
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardDetailsPage;