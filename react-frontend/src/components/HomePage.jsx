import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Your Home Page</h1>
      <Link to="/collection">
        <button>Your Collection</button>
      </Link>
      <p>A detailed digital view of your Trading Card Collection!</p>
      <p>Add Trading Cards you have to Your Collection!</p>
    </div>
  );
}

export default HomePage;