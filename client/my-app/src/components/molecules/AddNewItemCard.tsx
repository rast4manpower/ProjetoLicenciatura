import { Box, Button, ButtonProps, Card, Fab, Typography } from '@mui/material'
import { AddRounded } from '@mui/icons-material'
import { makeStyles } from 'tss-react/mui'
import { ReactNode } from 'react'

type AddNewItemCardProps = {
  title: ReactNode
  onClick: ButtonProps['onClick']
}

const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
  },
}))

const AddNewItemCard = ({ title, onClick }: AddNewItemCardProps) => {
  const { classes } = useStyles()
  return (
    <Card className={classes.root}>
      <Button
        color="inherit"
        onClick={onClick}
        fullWidth
        sx={{ height: '100%' }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Fab color="primary" aria-label="add" component="span">
            <AddRounded />
          </Fab>
          <Typography variant="button">{title}</Typography>
        </Box>
      </Button>
    </Card>
  )
}

export default AddNewItemCard
