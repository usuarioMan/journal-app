import {
  registerWithEmailPassowrd,
  signInWhitGoogle,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";
export const thunkChekingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const thunkGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWhitGoogle();
    result.ok ? dispatch(login(result)) : dispatch(logout(result));
  };
};

export const thunkCreatingUserWithEmailPassword = ({
  displayName,
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassowrd(
      {
        displayName,
        email,
        password,
      }
    );

    ok
      ? dispatch(login({ uid, email, displayName, photoURL }))
      : dispatch(logout({ errorMessage }));
  };
};
