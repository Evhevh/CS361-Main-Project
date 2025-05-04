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
      <p>Add trading cards you have to your collection to keep track of everything you own!</p>
    </div>
  );
}

export default HomePage;