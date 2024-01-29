import { login, logout } from "../reducers/reducers";

export const authUser = (username, password) => (dispatch) => {
  // validate credentials with a server)
  dispatch(login({ username }));
};

export const logoutUser = () => (dispatch) => {
  // Perform any necessary logout logic (e.g., clear tokens, invalidate sessions)
  dispatch(logout());
};
