import { Typography } from '@mui/material'

const Home = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div>
      <Typography variant="h2">{title}</Typography>
      <Typography>{subtitle} </Typography>
    </div>
  )
}

export default Home
