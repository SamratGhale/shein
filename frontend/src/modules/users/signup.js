import React, { useState, useContext } from 'react';
import { FormControl, Box, Link } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { Input } from '@mui/material';
import { Grid, Button, TextField } from '@mui/material';
import { PATH_PAGE } from '../../routes/paths';
import { signUp } from './services';
import { useSnackbar } from 'react-simple-snackbar';
import snakOptions from '../../constants/snakOptions';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const SignUp = () => {
  const [openSnackbar, closeSnackbar] = useSnackbar(snakOptions);
  const handleSignup = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    data.append('role', "USER");
    signUp(data).then((res) => {
      openSnackbar("Register successful please check your email for conformation");
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
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
                name="phone"
                label="Phone"
                type="phone"
                id="phone"
                autoComplete='phone'
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



              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              /*
              onClick={async () => {
                await handleSignup()
              }}
              */
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link sx={{ textDecoration: "none" }} to={PATH_PAGE.auth.login} component={RouterLink} variant="body2">
                    Already have an account? Log In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Grid >
  )
}
export default SignUp;