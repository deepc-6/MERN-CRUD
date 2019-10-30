import React, { useState, useEffect } from 'react';

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateUser(user);
      }}
    >
      <label>Name</label>
      <input
        type='text'
        name='name'
        value={user.name}
        onChange={handleInputChange}
      />
      <label>Age</label>
      <input
        type='number'
        name='age'
        value={user.age}
        onChange={handleInputChange}
      />
      <label>E-mail</label>
      <input
        type='text'
        name='email'
        value={user.email}
        onChange={handleInputChange}
      />
      <label>Password</label>
      <input
        type='text'
        name='password'
        value={user.password}
        onChange={handleInputChange}
        minLength={8}
      />
      <button>Update user</button>
      <button
        onClick={() => props.setEditing(false)}
        className='button muted-button'
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
