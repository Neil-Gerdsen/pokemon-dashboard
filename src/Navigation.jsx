import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">Pokémon App</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Search Pokémon</Link>
          </li>
          <li>
            <Link to="/top-pokemon">Top 10 Pokémon</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
