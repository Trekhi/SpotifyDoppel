// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpotifyPlaylist from './components/SpotifyPlaylist';

import LoginButton from './components/LoginButton';
import SearchBar from "./components/SearchBar";


function App() {
  return (
    <Router>
      <div>
        <LoginButton />
        <h1>Búsqueda de Canciones</h1>
        <SearchBar />
        <Routes>
          <Route path="/callback" element={<SpotifyPlaylist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
