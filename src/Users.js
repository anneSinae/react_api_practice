import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setUsers(null);
      setError(null);
      setLoading(true);
      const response = await axios.get(
        'http://jsonplaceholder.typicode.com/users'
      );
      setUsers(response.data);
    } catch (e) {
      console.log(e.response.status)
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    
    fetchUsers();
  }, []);

  if (loading) return <div>loading..</div>
  if (error) return <div>error..</div>
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>request again</button>
    </>
  );
}

export default Users;
