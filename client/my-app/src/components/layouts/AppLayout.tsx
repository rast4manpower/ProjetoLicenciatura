import type { ReactNode } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
} from '@mui/material'
import { NAVBAR_HEIGHT } from '@constants/layout'
import useAuth from 'hooks/useAuth'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { getInitials } from '@utils/string'

type AppLayoutProps = {
  children: ReactNode
}

const useStyles = makeStyles()((theme) => ({
  appBar: {
    background: theme.palette.background.paper,
    color: theme.palette.action.active,
    minHeight: NAVBAR_HEIGHT,
  },
  contentContainer: {
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    marginTop: NAVBAR_HEIGHT,
    padding: theme.spacing(3, 0),
  },
}))

const AppLayout = ({ children }: AppLayoutProps) => {
  const { classes } = useStyles()
  const { user, logout } = useAuth()
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              App Name
              <Box display="flex" gap={1}>
                <Button component={Link} to={'/'}>
                  Home
                </Button>
                <Button component={Link} to={'/About'}>
                  About
                </Button>
                {user && (
                  <Button component={Link} to={'/products'}>
                    Product
                  </Button>
                )}
              </Box>
              {user ? (
                <Box gap={2} display="flex">
                  <Avatar>{getInitials(user.username)}</Avatar>
                  <Button variant="contained" onClick={logout}>
                    logout
                  </Button>
                </Box>
              ) : (
                <Box gap={2} display="flex">
                  <Button variant="contained" component={Link} to={'/login'}>
                    Login
                  </Button>
                  <Button variant="contained" component={Link} to={'/sign_up'}>
                    Sign Up
                  </Button>
                </Box>
              )}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" className={classes.contentContainer}>
        {children}
      </Container>
    </>
  )
}

  





export default AppLayout
