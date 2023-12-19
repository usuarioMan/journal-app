import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerWithEmailPassowrd,
  signInWhitGoogle,
} from "../../firebase/providers";
import { clearNotesOnLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";
export const thunkChekingAuthentication = () => {
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
      ? dispatch(login({ uid, email, displayName, photoURL, errorMessage }))
      : dispatch(logout({ errorMessage }));
  };
};

export const thunkSingInWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, displayName, errorMessage } =
      await loginWithEmailAndPassword({ email, password });

    ok
      ? dispatch(login({ uid, email, displayName, photoURL }))
      : dispatch(logout({ errorMessage }));
  };
};

export const thunkLogOut = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    await logoutFirebase();
    dispatch(clearNotesOnLogout());
    dispatch(logout({}));
  };
};
