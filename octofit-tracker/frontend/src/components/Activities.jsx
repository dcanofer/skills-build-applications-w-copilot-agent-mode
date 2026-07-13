import { useEffect, useState } from 'react';
import { normalizeApiResponse } from '../utils/api.js';

const apiPath = '/api/activities/';
const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const apiUrl = `${apiBaseUrl}${apiPath}`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Unable to load activities: ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setActivities(normalizeApiResponse(payload));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    };

    loadActivities();

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
        <h2 className="h4 mb-3">Activities</h2>
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6 col-xl-4" key={activity._id ?? activity.type + activity.date}>
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h3 className="h5">{activity.type}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes ?? activity.duration} min</p>
                  <p className="mb-1"><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                  <p className="mb-0"><strong>Calories:</strong> {activity.caloriesBurned ?? 'n/a'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Activities;
