import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="App d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img className="navbar-logo me-2" src="/octofitapp-small.svg" alt="Octofit" />
            Octofit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/activities">Activités</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Équipes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Utilisateurs</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Entraînements</Link></li>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button className="btn btn-sm btn-outline-light" onClick={toggleTheme}>
                  {theme === 'dark' ? '🌞 Mode clair' : '🌙 Mode sombre'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="main-content container py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={
            <div className="welcome-section text-center">
              <h1 className="display-5 fw-bold">Bienvenue sur Octofit Tracker</h1>
              <p className="lead text-muted mb-4">Suivez vos activités, rejoignez des équipes et grimpez au leaderboard.</p>
              <div className="row g-4 justify-content-center">
                <div className="col-12 col-md-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">Commencer</h5>
                      <p className="card-text">Parcourez vos activités récentes et gardez la motivation.</p>
                      <Link to="/activities" className="btn btn-primary">Voir les activités</Link>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">Rejoindre une équipe</h5>
                      <p className="card-text">Trouvez une équipe pour vous challenger ensemble.</p>
                      <Link to="/teams" className="btn btn-outline-primary">Parcourir les équipes</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer className="bg-light border-top py-3 mt-auto">
        <div className="container text-center text-muted">© {new Date().getFullYear()} Octofit Tracker</div>
      </footer>
    </div>
  );
}

export default App;
