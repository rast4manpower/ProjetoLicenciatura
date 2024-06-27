import { Grid, Typography } from '@mui/material'
import ItemCard from '@components/molecules/ItemCard'
import axios from 'axios'
import useSWR from 'swr'

const Home = () => {
  const fakeItem = {
    name: 'Item name',
    price: 30,
    address: 'Rua da Carreira',
    image: 'url',
    sellerName: 'João José',
    createdAt: new Date('01/20/2020').toISOString(),
  }

  const fakeItem2 = {
    name: 'Item name',
    price: 30,
    address: 'Rua da Carreira',
    image: 'url',
    sellerName: 'João José',
    createdAt: new Date('01/20/2020').toISOString(),
  }

  const items = [fakeItem, fakeItem2]

  const { data, error } = useSWR(['getAllProducts'], () =>
    //TODO colocar aqui a rota correcta da api
    axios.post('http://localhost:3001/getallprodutcs'),
  )

  return (
    <Grid container gap={2}>
      {error ? (
        <Typography> Error!!!</Typography>
      ) : data ? (
        items.map((item, index) => (
          <Grid item key={index} xs={3}>
            <ItemCard item={item} />
          </Grid>
        ))
      ) : (
        <Typography> Esta a carregar</Typography>
      )}
    </Grid>
  )
}
export default Home
