import './App.css';
import MovieListPage from './MovieListPage';
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import MovieSinglePage from './MovieSinglePage';
import MovieCreatePage from './MovieCreatePage';
import MovieModPage from './MovieModPage';
import MovieDeletePage from './MovieDeletePage';

function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to={`/`} className="nav-link">
              <span className="nav-link">Filmek</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/uj-film`} className="nav-link">
              <span className="nav-link">Új film</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={<MovieListPage />} />
      <Route path="/movie/:id" element={<MovieSinglePage />} />
      <Route path="/uj-film" element={<MovieCreatePage />} />
      <Route path="/mod-movie/:id" element={<MovieModPage />} />
      <Route path="/torol-movie/:id" element={<MovieDeletePage />} />
    </Routes>
  </Router>
  );
}

export default App;
