import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  getAll,
  createOneUser,
  updateUser,
  deleteUser,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));
    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        history.push('/');
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getAll() {
  return (dispatch) => {
    dispatch(request());
    userService
      .getAll()
      .then(
        (users) => dispatch(success(users)),
        (error) => dispatch(failure(error)),
      );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function createOneUser(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.createOneUser(user).then(
      () => {
        dispatch(success());
        dispatch(getAll());
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        dispatch(getAll());
      },
    );
  };
  function request(user) {
    return { type: userConstants.CREATEONE_REQUEST, user };
  }
  function success() {
    return { type: userConstants.CREATEONE_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.CREATEONE_FAILURE, error };
  }
}

function updateUser(updatedUser) {
  return (dispatch) => {
    dispatch(request(updatedUser));
    userService.updateUser(updatedUser).then(
      (user) => {
        dispatch(success(user));
        dispatch(getAll());
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        dispatch(getAll());
      },
    );
  };
  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }
}

function deleteUser(id) {
  return (dispatch) => {
    dispatch(request(id));
    userService.deleteUser(id).then(
      () => {
        dispatch(success());
        dispatch(getAll());
      },
      (error) => {
        if (error && error.message) {
          error = error.message;
        }
        dispatch(failure(error));
        dispatch(alertActions.error(error));
        dispatch(getAll());
      },
    );
  };
  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success() {
    return { type: userConstants.DELETE_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.DELETE_FAILURE, error };
  }
}
