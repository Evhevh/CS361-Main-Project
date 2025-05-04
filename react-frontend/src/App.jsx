import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import CollectionPage from './components/CollectionPage';
import AddCardPage from './components/AddCardPage';
import CardDetailsPage from './components/CardDetailsPage';
import DeleteCardPage from './components/DeleteCardPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/add-card" element={<AddCardPage />} />
          <Route path="/card-details/:cardId" element={<CardDetailsPage />} />
          <Route path="/delete-card/:cardId" element={<DeleteCardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;