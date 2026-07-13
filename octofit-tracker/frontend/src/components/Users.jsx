import { useEffect, useState } from 'react';
import { normalizeApiResponse } from '../utils/api.js';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Unable to load users: ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setUsers(normalizeApiResponse(payload));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    };

    loadUsers();

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
        <h2 className="h4 mb-3">Users</h2>
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6 col-xl-4" key={user._id ?? user.username ?? user.email}>
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h3 className="h5">{user.displayName ?? user.name ?? user.username}</h3>
                  <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="mb-1"><strong>Goal:</strong> {user.goal ?? 'Build consistency'}</p>
                  <p className="mb-0"><strong>Points:</strong> {user.points ?? 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Users;
