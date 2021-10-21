import {
  SET_USER_AUTHENTICATION,
  SET_USER_AUTH_EXPIRATION,
  DEL_USER_AUTHENTICATION,
  POP_USER_AUTHENTICATION,
} from "../actionTypes";

import {
  validateAuthenticated,
  validateExpired,
} from "../../../helpers/functionals";

import { initUserState } from "../stateTypes";

function userReducer(state = new initUserState(), action) {
  switch (action.type) {
    case SET_USER_AUTHENTICATION:
      state.isAuthenticated = action.payload.isAuthenticated;
      // console.log("user AUTH :", state);
      return state;

    case SET_USER_AUTH_EXPIRATION:
      state.isExpired = action.payload.isExpired;
      // console.log("user EXPI :", state);
      return state;

    case DEL_USER_AUTHENTICATION:
      state = new initUserState();
      // console.log("user is logout", state);
      return state;

    case POP_USER_AUTHENTICATION:
      // console.log("verified authentication");
      state.isAuthenticated = validateAuthenticated();
      state.isExpired = validateExpired();
      return state;
    default:
      return state;
  }
}

export default userReducer;
