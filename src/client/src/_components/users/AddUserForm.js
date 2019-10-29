import React, { useState } from 'react';

export const AddUserForm = (props) => {
  const initialFormState = {
    name: '',
    age: '',
    balance: '',
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type='text'
        name='name'
        value={user.name}
        onChange={handleInputChange}
        required
      />
      <label>Age</label>
      <input
        type='number'
        name='age'
        value={user.age}
        onChange={handleInputChange}
        required
      />
      <label>Balance</label>
      <input
        type='number'
        name='balance'
        value={user.balance}
        onChange={handleInputChange}
        required
      />
      <label>E-mail</label>
      <input
        type='email'
        name='email'
        value={user.email}
        onChange={handleInputChange}
        required
      />
      <label>Password</label>
      <input
        type='text'
        name='password'
        value={user.password}
        onChange={handleInputChange}
        required
      />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
