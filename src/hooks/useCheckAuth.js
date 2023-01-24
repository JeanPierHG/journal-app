import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks';

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, photoURL, email, uid } = user;
      dispatch(login({ displayName, photoURL, email, uid }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return status;
};
