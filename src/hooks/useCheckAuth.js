import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { firebaseAuth } from "../firebase/config";
import { thunkStartLoadingNotes } from "../store";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoUrl } = user;
      dispatch(login({ uid, email, displayName, photoUrl }));
      dispatch(thunkStartLoadingNotes());
    });
  }, []);

  return {
    status,
  };
};
