import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { asyncReducer } from './asyncReducer';

function Users() {
  const [state, dispatch] = useReducer(asyncReducer, {
    loading: false,
    data: null,
    error: null
  });

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await axios.get(
        'http://jsonplaceholder.typicode.com/users'
      );
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data : users, error } = state;
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
