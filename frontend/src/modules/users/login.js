import React, { useState, useContext } from 'react';
import { FormControl, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { Grid, Button, TextField } from '@mui/material';
import { useSnackbar } from 'react-simple-snackbar';
import { GoogleLogin } from '@react-oauth/google';
import { PATH_APP, PATH_PAGE, ROOTS } from '../../routes/paths';
import snakOptions from '../../constants/snakOptions';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { googleLogin, login } from './services';
const theme = createTheme();

const Login = () => {

  const [openSnackbar, closeSnackbar] = useSnackbar(snakOptions);
  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data).then((res) => {
      openSnackbar("Login successful");
    }).catch((err) => {
      console.log(err.response.data.message);
      openSnackbar(err.response.data.message);
    });
  }
  return (
    <Grid sx={{ mb: 20 }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link sx={{ textDecoration: "none" }} to={PATH_PAGE.auth.signup} component={RouterLink} variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Grid container sx={{ alignItems: "center", justifyContent: "center", mt: 5 }}>
        <Grid item>
          <GoogleLogin size='large'
            onSuccess={credentialResponse => {
              googleLogin(credentialResponse.credential)
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Grid>
      </Grid>
    </Grid >

  )
}
export default Login;