import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function DeleteCardPage() {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cards/${cardId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCardName(data.name);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [cardId]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${cardName}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/cards/${cardId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete card.');
        }

        navigate('/collection');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading card information...</div>;
  }

  if (error) {
    return <div>Error loading card information: {error.message}</div>;
  }

  return (
    <div className="delete-card-page">
      <h1>Delete Card Page</h1>
      <p>Are you sure you want to delete <strong>{cardName}</strong>?</p>
      <p>Deleting will remove this card from your collection permanently.</p>
      <p>This cannot be undone.</p>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleDelete}>Confirm Delete</button>
      <Link to={`/card-details/${cardId}`}>
        <button>Cancel</button>
      </Link>
    </div>
  );
}

export default DeleteCardPage;