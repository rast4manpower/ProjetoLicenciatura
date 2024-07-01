import { ChangeEvent, useState } from 'react'
import {
  Paper,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  Box,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoadingButton } from '@mui/lab'
import { NAVBAR_HEIGHT } from '@constants/layout'
import useAuth from '@hooks/useAuth'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
}))

const Login = () => {
  const { classes } = useStyles()

  const { login } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState({
    username: '',
    password: '',
  })

  const handleAccountChange = (
    property: 'username' | 'password',
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setAccount((previous) => ({
      ...previous,
      [property]: event.target.value,
    }))
  }

  const handleLogin = async () => {
    setIsLoading(true)
    await login(account)
    setIsLoading(false)
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
          <TextField
            onChange={(event) => handleAccountChange('username', event)}
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
          />

          <TextField
            onChange={(event) => handleAccountChange('password', event)}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <LoadingButton
            variant="contained"
            loading={isLoading}
            onClick={handleLogin}
          >
            Login
          </LoadingButton>
          <Link to={'/sign_up'}>{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Login
