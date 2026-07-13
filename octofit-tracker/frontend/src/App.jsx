import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import logo from '../../../docs/octofitapp-small.png';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './utils/api.js';
import './App.css';

const navigation = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Overview() {
  return (
    <section className="card shadow-sm border-0 page-card">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-4 mb-4">
          <img src={logo} alt="Octofit Tracker logo" className="app-logo" />
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-2">Octofit Tracker</p>
            <h1 className="display-6 mb-2">Fitness coordination for your next competition cycle</h1>
            <p className="text-secondary mb-0">
              Track people, teams, activities, workouts, and leaderboard performance from the
              same React presentation layer.
            </p>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6 col-xl-3">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h2 className="h5">API endpoint</h2>
                <p className="mb-0 text-muted">{getApiBaseUrl()}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h2 className="h5">Environment</h2>
                <p className="mb-0 text-muted">Vite + React 19</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h2 className="h5">Data layer</h2>
                <p className="mb-0 text-muted">MongoDB-backed API</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body">
                <h2 className="h5">Navigation</h2>
                <p className="mb-0 text-muted">Route-driven views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
        <div className="container-fluid px-3 px-lg-4">
          <span className="navbar-brand d-flex align-items-center gap-2 fw-semibold">
            <img src={logo} alt="Octofit Tracker" className="brand-logo" />
            Octofit Tracker
          </span>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${isActive ? 'active bg-white text-primary' : 'text-white-50'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container-fluid px-3 px-lg-4 py-4">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
