import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signWithEmailPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    let errorMessage = '';

    switch (error.message) {
      case 'Firebase: Error (auth/user-not-found).':
        errorMessage = 'Email no existente.';
        break;
      case 'Firebase: Error (auth/wrong-password).':
        errorMessage = 'Contraseña incorrecta.';
        break;
    }

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};

export const registerUseWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    let errorMessage = '';

    switch (error.message) {
      case 'Firebase: Error (auth/invalid-email).':
        errorMessage = 'El correo es invalido.';
        break;
      case 'Firebase: Error (auth/email-already-in-use).':
        errorMessage = 'El correo ya está en uso.';
        break;
    }

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
