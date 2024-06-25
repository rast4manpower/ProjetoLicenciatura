import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface SignUpFormValues {
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const initialValues: SignUpFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(15, 'Username cannot exceed 15 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .max(20, 'Password cannot exceed 20 characters')
      .required('Password is required'),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await axios.post('http://localhost:3001/auth', data);
      console.log('Sign up successful:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="formContainer">
          <div>
            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="(Ex. John123...)"
            />
            <ErrorMessage name="username" component="span" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Your Password..."
            />
            <ErrorMessage name="password" component="span" />
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
import { NAVBAR_HEIGHT } from '@constants/layout'
import {
  Paper,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  Box,
} from '@mui/material'
import useAuth from 'hooks/useAuth'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const useStyles = makeStyles()((theme) => ({
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
}))

const Login = () => {
  const { classes } = useStyles()
  const { login } = useAuth()

  const [account, setAccount] = useState({
    username: '',
    password: '',
    email: '',
  })

  const handelAccount = (
    property: 'username' | 'password' | 'email',
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setAccount((previous) => ({
      ...previous,
      [property]: event.target.value,
    }))
  }

  return (
    <Container
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 48px)`,
        display: 'flex',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={{ padding: 0 }}
    >
      <Paper sx={{ padding: 5, width: 450 }}>
        <Grid container gap={3} direction="column">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4">Sign Up</Typography>
          </Box>
          <TextField
            onChange={(event) => handelAccount('username', event)}
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />

          <TextField
            onChange={(event) => handelAccount('email', event)}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
          />

          <TextField
            onChange={(event) => handelAccount('password', event)}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button variant="contained" onClick={() => login(account)}>
            Login
          </Button>
          <Link to={'/login'}>{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Paper>
    </Container>
  )
}
export default Login
