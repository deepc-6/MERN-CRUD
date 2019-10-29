import React from 'react';

export const UserView = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>E-mail</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users && props.users.length > 0 ? (
        props.users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button className='button muted-button'>View</button>
              <button className='button muted-button'>Edit</button>
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
