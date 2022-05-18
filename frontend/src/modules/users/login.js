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

import { googleLogin, login } from './services';

const Login = () => {

  const [openSnackbar, closeSnackbar] = useSnackbar(snakOptions);
  const handleLogin = async () => {
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    login(form).then((res) => {
      openSnackbar("Login successful");
    }).catch((err) => {
      console.log(err.response.data.message);
      openSnackbar(err.response.data.message);
    });
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Grid
        container
        spacing={0}
        justifyContent="center"
      >
        <Box component="form">
          <FormControl variant="standard">
            <InputLabel >Email</InputLabel>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <br />
          <FormControl variant="standard">
            <InputLabel >Password</InputLabel>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" />
          </FormControl>
          <br />
          <Button onClick={handleLogin} color="success">Submit</Button>
          <br />
          <Link variant='subtitle2' to={PATH_PAGE.auth.signup} component={RouterLink} style={{ textDecoration: 'none' }} >
            Don't have an account? Sign up
          </Link>
        </Box>
      </Grid>
      <GoogleLogin
        onSuccess={credentialResponse => {
          googleLogin(credentialResponse.credential)
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div >
  )
}
export default Login;