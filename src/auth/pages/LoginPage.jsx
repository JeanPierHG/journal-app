import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/';

const formData = {
  email: '',
  password: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @.'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData, formValidations);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title='Login'>
      <form className='animate__animated animate__fadeIn animate__faster' onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              name='email'
              onChange={onInputChange}
              value={email}
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              name='password'
              onChange={onInputChange}
              value={password}
              label='Contraseña'
              type='password'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2 }} display={!!errorMessage ? '' : 'none'}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button color='secondary' disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color='secondary'
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant='contained'
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={'row'} justifyContent='end'>
            <Link component={RouterLink} color={'inherit'} to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
