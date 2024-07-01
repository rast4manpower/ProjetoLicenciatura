import { Grid, Typography } from '@mui/material'
import ItemCard from '@components/molecules/ItemCard'
import axios from 'axios'
import useSWR from 'swr'

const Home = () => {
  const { data, error } = useSWR(['getAllProducts'], () =>
    axios.get('http://localhost:3001/products'),
  )

  return (
    <Grid container spacing={2}>
      {error ? (
        <Typography>Algo correu mal. Por favor tente mais tarde.</Typography>
      ) : data ? (
        data.data.map((item: {
          name: string
          image: string
          address: string
          price: number
          sellerName: string
          createdAt: string
        }, index: number) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
        <ItemCard item={item} />
          </Grid>
        ))
      ) : (
        <Typography> Loading...</Typography>
      )}
    </Grid>
  )
}
export default Home
