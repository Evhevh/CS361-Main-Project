import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1>Trading Card Collector</h1>
      <p>All your cards in one place.</p>
      <Link to="/home">
        <button>Welcome! Click to Proceed!</button>
      </Link>
    </div>
  );
}

export default WelcomePage;