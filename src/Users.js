import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
  const response = await axios.get('http://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [state, refetch] =useAsync(getUsers, [], true);

  const { loading, data : users, error } = state;
  if (loading) return <div>loading..</div>
  if (error) return <div>error..</div>
  if (!users) return <button onClick={refetch}>request data</button>;

  return (
    <>
      <ul>
        {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
        ))}
      </ul>
      <button onClick={refetch}>request again</button>
    </>
  );
}

export default Users;
