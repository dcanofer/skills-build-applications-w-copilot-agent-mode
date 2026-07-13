import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../utils/api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/leaderboard/`);

        if (!response.ok) {
          throw new Error(`Unable to load leaderboard: ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setEntries(normalizeApiResponse(payload));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id ?? `${entry.rank}-${entry.name}`}>
              <div>
                <div className="fw-semibold">#{entry.rank ?? 'n/a'} {entry.name}</div>
                <div className="text-muted">Points: {entry.points ?? 0}</div>
              </div>
              <span className="badge bg-primary rounded-pill">Streak {entry.streak ?? 0}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
