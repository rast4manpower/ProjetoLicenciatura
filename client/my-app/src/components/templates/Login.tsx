import { NAVBAR_HEIGHT } from '@constants/layout'
import {
  Paper,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from '@mui/material'
import useAuth from 'hooks/useAuth'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()

  const [account, setAccount] = useState({ username: '', password: '' })

  const handelAccount = (
    property: 'username' | 'password',
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
        bgcolor: 'lightblue',
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 48px)`,
        display: 'flex',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={{ padding: 0 }}
    >
      <Paper sx={{ padding: 2, width: 400 }}>
        <Grid container gap={2} direction="column">
          <Typography variant="h3">Login</Typography>
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

          <Link to={'/sign_up'}>{"Don't have an account? Sign Up"}</Link>

          <Button onClick={() => login(account)}>Login</Button>
        </Grid>
      </Paper>
    </Container>
  )
}
export default Login
