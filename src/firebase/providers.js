import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./config";
const provider = new GoogleAuthProvider();

export const signInWhitGoogle = async () => {
  try {
    // Esto ok.
    const result = await signInWithPopup(firebaseAuth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (e) {
    const errorMessage = e.message || e;
    console.error(errorMessage);
    return { ok: false, errorMessage };
  }
};
