import React, { useState } from 'react';

import { UserTable } from './tables/UserTable';
import { AddUserForm } from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

export const User = (props) => {
  const { user, users } = props;

  const initialFormState = {
    name: '',
    age: '',
    balance: '',
    email: '',
    password: '',
  };

  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const updateUser = (updatedUser) => {
    setEditing(false);
    props.updateUser(updatedUser);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      password: '',
    });
  };

  const deleteUser = (id) => {
    setEditing(false);
    props.deleteUser(id);
  };

  return (
    <div className='container'>
      <h1 className='center greyBackground'>
        You are logged in as {user.name}
      </h1>
      <div className='flex-row'>
        <div className='flex-large'>
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2 className='center'>Add user</h2>
              <AddUserForm addUser={props.addUser} />
            </div>
          )}
        </div>
        <div className='flex-large'>
          <h2 className='center'>View users</h2>
          <UserTable
            users={users}
            editRow={editRow}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};
