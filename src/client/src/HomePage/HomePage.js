import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className='col-md-6 col-md-offset-3'>
        {user && users && (
          <div>
            <h1>Hi {user.name}!</h1>
            <p>You are now logged in</p>
            <h3>Users from secure api end point:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && (
              <span className='text-danger'>ERROR: {users.error.message}</span>
            )}
            {users.users && (
              <ul>
                {users.users.map((user, index) => (
                  <li key={user._id}>
                    <p>Name: {user.name}</p>
                    <p>E-mail: {user.email}</p>
                  </li>
                ))}
              </ul>
            )}
            <p>
              <Link to='/login'>Logout</Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
