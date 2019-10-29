import React from 'react';

import { UserTable } from './UserTable';
import { AddUserForm } from './AddUserForm';

export const User = (props) => {
  const { user, users } = props;

  return (
    <div className='container'>
      <h1>You are logged in as {user.name}</h1>
      <div className='flex-row'>
        <div className='flex-large'>
          <h2>Add user</h2>
          <AddUserForm addUser={props.addUser} />
        </div>
        <div className='flex-large'>
          <h2>View users</h2>
          <UserTable users={users} deleteUser={props.deleteUser} />
        </div>
      </div>
    </div>
  );
};
