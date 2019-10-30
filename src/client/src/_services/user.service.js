import config from './../config/config';
import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  getAll,
  createOneUser,
  updateUser,
  deleteUser,
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${config.apiUrl}/login`, requestOptions)
    .then(handleResponse)
    .then((_user) => {
      const user = _user.user;
      user.token = _user.token;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${config.apiUrl}/users/list`, requestOptions).then(
    handleResponse,
  );
}

function createOneUser(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };
  return fetch(`${config.apiUrl}/add/user`, requestOptions).then(
    handleResponse,
  );
}

function updateUser(user) {
  const id = user._id;
  delete user._id;
  if (!user.password) {
    delete user.password;
  }
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(user),
  };
  return fetch(`${config.apiUrl}/user/${id}`, requestOptions).then(
    handleResponse,
  );
}

function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };
  return fetch(`${config.apiUrl}/delete/user/${id}`, requestOptions).then(
    handleResponse,
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
