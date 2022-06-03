import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import { UserContext } from '../../../modules/users/context';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { PATH_APP, PATH_PAGE, ROOTS } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const { userLogin } = useContext(UserContext);


  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      userLogin(values).then((res) => {
        enqueueSnackbar("Login Successful!", { variant: "success" })
        navigate('/app',{replace: true})
      }).catch(err => {
        enqueueSnackbar(err.response.data.message, { variant: "error" })
        console.log(err.response.data.message);
      });
      //window.location = ROOTS.app;
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Login
        </LoadingButton>
      </Form>
      <GoogleLogin
        onSuccess={credentialResponse => {
          //googleLogin(credentialResponse.credential)
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </FormikProvider>
  );
}
