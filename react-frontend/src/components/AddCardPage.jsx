import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCardPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [series, setSeries] = useState('');
    const [set, setSet] = useState('');
    const [pricePurchased, setPricePurchased] = useState('');
    const [dateAcquired, setDateAcquired] = useState('');
    const [imageFilename, setImageFilename] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (!name || !imageFilename) {
            setError('Please provide a name and image filename.');
            return;
        }

        const fullImageFilename = imageFilename + '.jpg';

        const cardData = {
            name,
            series,
            set,
            price_purchased: parseFloat(pricePurchased) || null,
            date_acquired: dateAcquired || null,
            image_filename: fullImageFilename,
        };

        try {
            const response = await fetch('http://localhost:5000/api/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add card.');
            }

            navigate('/collection');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="add-card-page">
            <h1>Add New Card</h1>
            <p>Fill out the form below to add a card to your collection</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Card Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="series">Series:</label>
                    <input type="text" id="series" value={series} onChange={(e) => setSeries(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="set">Set:</label>
                    <input type="text" id="set" value={set} onChange={(e) => setSet(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="pricePurchased">Price Purchased:</label>
                    <input type="number" step="0.01" id="pricePurchased" value={pricePurchased} onChange={(e) => setPricePurchased(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="dateAcquired">Date Acquired:</label>
                    <input type="date" id="dateAcquired" value={dateAcquired} onChange={(e) => setDateAcquired(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="imageFilename">Image Filename:</label>
                    <input
                        type="text"
                        id="imageFilename"
                        value={imageFilename}
                        onChange={(e) => setImageFilename(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Card</button>
            </form>
            <button onClick={() => navigate('/collection')}>Back to Collection Page</button>
        </div>
    );
}

export default AddCardPage;