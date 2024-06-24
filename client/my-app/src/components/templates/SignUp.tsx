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
