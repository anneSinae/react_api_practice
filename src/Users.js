import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

async function getUsers() {
  const response = await axios.get('http://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const { data: users, error, isLoading, reload } = useAsync({
    promiseFn : getUsers
  })

  if (isLoading) return <div>loading..</div>
  if (error) return <div>error..</div>
  if (!users) return <button onClick={reload}>request data</button>;

  return (
    <>
      <ul>
        {users.map(user => (
        <li key={user.id} onClick={() => setUserId(user.id)}>
          {user.username} ({user.name})
        </li>
        ))}
      </ul>
      <button onClick={reload}>request again</button>
      { userId && <User id={userId} />}
    </>
  );
}

export default Users;
