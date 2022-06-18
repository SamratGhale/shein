import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, TextField, Typography, FormHelperText, FormControlLabel } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import useUsers from '../../../hooks/useUsers';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default function UserNewForm({ isEdit, id}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [currentUser, setCurrentUser] = useState({});
  const {addUser, updateUser} = useUsers();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First is required'),
    lastName: Yup.string().required('Last is required'),
    email: Yup.string().required('Email is required').email(),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName : currentUser?.firstName|| '',
      lastName: currentUser?.lastName|| '',
      email: currentUser?.email || '',
      phone: currentUser?.phone|| '',
      address: currentUser?.address || '',
      state: currentUser?.state || '',
      avatarUrl: currentUser?.avatarUrl || null,
      is_registered: currentUser?.is_registered|| false,
      is_archived: currentUser?.is_archived || false,
      role: currentUser?.role || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
        console.log(values)
      try {
        if(isEdit){
          await updateUser(id, values);
        }else{
          await addUser(values);
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  const {getById} = useUsers();

  useEffect(() => {
    if (isEdit) {
      getById(id).then((res) => {
        console.log(res)
        setCurrentUser(res);
      }).catch((err) => {
        navigate(-1);
      })
    }
  }, [])

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>

              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) => setFieldValue('is_archived', event.target.checked)}
                      checked={values.is_archived}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('is_registered')} checked={values.is_registered} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Second Name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone&& errors.phone)}
                    helperText={touched.phone&& errors.phone}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    SelectProps={{ native: true }}
                    value="STAFF"
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    {['STAFF', 'ADMIN','USER'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    </TextField>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
