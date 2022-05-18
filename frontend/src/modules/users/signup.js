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

const SignUp = () => {
  const [openSnackbar, closeSnackbar] = useSnackbar(snakOptions);
  const handleSignup = async () => {
    const form = new FormData();
    form.append("email", email);
    form.append("phone", phone);
    form.append("password", password);
    form.append("role", "USER");
    signUp(form).then((res) => {
      openSnackbar("Register successful please check your email for conformation");
    }).catch((err) => {
      console.log(err.response.data.message);
      openSnackbar(err.response.data.message);
    });
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(null);
  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
    >
      <Box component="form">
        <FormControl variant="standard">
          <InputLabel >Email</InputLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel >Phone Number</InputLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" />
        </FormControl>
        <br />
        <FormControl variant="standard">
          <InputLabel >Password</InputLabel>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </FormControl>
        <br />
        <Button onClick={async () => { await handleSignup() }} color="success">Submit</Button>
        <br />
        <Link variant='subtitle2' to={PATH_PAGE.auth.login} component={RouterLink} style={{ textDecoration: 'none' }} >
          Already have an account? Log In
        </Link>
      </Box>
    </Grid>
  )
}
export default SignUp;