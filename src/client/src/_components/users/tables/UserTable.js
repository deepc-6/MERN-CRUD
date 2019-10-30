import React from 'react';

export const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th className='center'>Name</th>
        <th className='center'>E-mail</th>
        <th className='center'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users && props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user);
                }}
                className='button muted-button'
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteUser(user._id)}
                className='button muted-button'
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
);
