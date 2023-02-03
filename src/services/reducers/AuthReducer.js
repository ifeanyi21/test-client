import { ACTION_TYPES } from "../actions/actions";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        loggedIn: true,
        user: action.payload.user,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        loggedIn: false,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
