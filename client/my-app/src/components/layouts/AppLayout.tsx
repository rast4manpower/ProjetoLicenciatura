import type { ReactNode } from 'react'
import { AppBar, Box, Button, Container, Grid, Toolbar } from '@mui/material'
import { NAVBAR_HEIGHT } from '@constants/layout'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

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
              LOGO
              <Box display="flex" gap={1}>
                <Button component={Link} to={'/'}>
                  Home
                </Button>
                <Button component={Link} to={'/About'}>
                  About
                </Button>
                <Button component={Link} to={'/products'}>
                  Products
                </Button>
              </Box>
              <Button variant="contained" component={Link} to={'/login'}>
                Login
              </Button>
              <Button variant="contained" component={Link} to={'/signup'}>
                  Sign Up
                </Button>
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
