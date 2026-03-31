import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import SearchPage from './SearchPage';
import TopPokemonPage from './TopPokemonPage';
import SideBarPokemon from './SideBarPokemon';
import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/top-pokemon" element={<TopPokemonPage />} />
          <Route path="/side-bar-pokemon" element={<SideBarPokemon />} />
        </Routes>
      </div>
    </>
  );
}

export default App;