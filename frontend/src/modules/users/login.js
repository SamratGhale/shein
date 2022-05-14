import React, { useState, useContext } from 'react';
import { FormControl, Box } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { Grid, Button, TextField } from '@mui/material';
import { GoogleLogin} from '@react-oauth/google';
import { ROOTS } from '../../routes/paths';


const Login = ({handleClose, setMessage, setSevernity}) => {
    const handleLogin=async()=>{
        try{
            /*
            await userLogin({email, password});
            setMessage("Login successful");
            setSevernity("success");
            handleClose();
            history.push(ROOTS.app)
            */
        }catch(err){
            setSevernity("error");
            setMessage(err.response.data.message);
            handleClose();
        }
    }
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    return (
        <Grid
            container
            spacing={0}
            justifyContent="center"
        >
          <Box component="form">
          <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple"/>
      </FormControl>

<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;

          </Box>
        </Grid>
    )
}
export default Login;