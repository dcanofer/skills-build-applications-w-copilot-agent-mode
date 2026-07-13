import { useEffect, useState } from 'react';
import { getApiUrl, normalizeApiResponse } from '../utils/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));

        if (!response.ok) {
          throw new Error(`Unable to load workouts: ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setWorkouts(normalizeApiResponse(payload));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    };

    loadWorkouts();

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
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6 col-xl-4" key={workout._id ?? workout.title}>
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h3 className="h5">{workout.title}</h3>
                  <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workouts;
