import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @.'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es requerido.'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Register'>
      <form className='animate__animated animate__fadeIn animate__faster' onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='Nombre completo'
              type='text'
              placeholder='Jean Pierre'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              color='secondary'
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@email.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              color='secondary'
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              color='secondary'
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button color='secondary' disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={'row'} justifyContent='end'>
            <Typography>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color={'inherit'} to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
