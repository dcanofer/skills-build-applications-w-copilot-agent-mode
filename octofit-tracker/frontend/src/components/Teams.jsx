import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/teams/`);

        if (!response.ok) {
          throw new Error(`Unable to load teams: ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setTeams(normalizeApiResponse(payload));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    };

    loadTeams();

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
        <h2 className="h4 mb-3">Teams</h2>
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id ?? team.name}>
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h3 className="h5">{team.name}</h3>
                  <p className="mb-1"><strong>Focus:</strong> {team.focusArea}</p>
                  <p className="mb-1"><strong>Captain:</strong> {team.captain}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;
