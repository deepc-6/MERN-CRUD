import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { User } from '../_components/users/User';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  addUser = (user) => {
    this.props.dispatch(userActions.createOneUser(user));
  };

  updateUser = (user) => {
    this.props.dispatch(userActions.updateUser(user));
  };

  deleteUser = (id) => {
    this.props.dispatch(userActions.deleteUser(id));
  };

  render() {
    const { user, users } = this.props;
    return (
      <div className='container'>
        <div className='buttonContainer'>
          <button>
            <Link to='/login'>Logout</Link>
          </button>
        </div>
        {user && users && (
          <div>
            {users.loading && <em>Loading users...</em>}
            {users.error && (
              <span className='text-danger'>ERROR: {users.error.message}</span>
            )}
            {users.users && (
              <User
                fetchedUser={users.fetchedUser}
                addUser={this.addUser}
                updateUser={this.updateUser}
                deleteUser={this.deleteUser}
                dispatch={this.props.dispatch}
                user={user}
                users={users.users}
              />
            )}
            {users.fetchedUser && (
              <User
                fetchedUser={users.fetchedUser}
                addUser={this.addUser}
                updateUser={this.updateUser}
                deleteUser={this.deleteUser}
                dispatch={this.props.dispatch}
                user={user}
                users={users.users}
              />
            )}
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
