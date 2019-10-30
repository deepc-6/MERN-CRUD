import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        users: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.CREATEONE_REQUEST:
      return {
        loading: true,
      };
    case userConstants.CREATEONE_SUCCESS:
      return {};
    case userConstants.CREATEONE_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.UPDATE_REQUEST:
      return {
        loading: true,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        user: action.user,
      };
    case userConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.DELETE_REQUEST:
      return {
        loading: true,
      };
    case userConstants.DELETE_SUCCESS:
      return {};
    case userConstants.DELETE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
