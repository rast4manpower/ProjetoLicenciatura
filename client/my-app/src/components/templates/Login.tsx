import { NAVBAR_HEIGHT } from '@constants/layout';
import {
  Paper,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  Box,
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

const useStyles = makeStyles()((theme) => ({
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Login = () => {
  const { classes } = useStyles();
  const { login } = useAuth();

  const [account, setAccount] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleAccount = (
    property: 'username' | 'password',
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setAccount((previous) => ({
      ...previous,
      [property]: event.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', account);
      login(response.data);
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

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
            <Typography variant="h4">Login</Typography>
          </Box>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <TextField
            onChange={(event) => handleAccount('username', event)}
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />

          <TextField
            onChange={(event) => handleAccount('password', event)}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Link to={'/sign_up'}>{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;

