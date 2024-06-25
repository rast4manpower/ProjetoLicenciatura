import { Grid } from '@mui/material'
import ItemCard from '@components/molecules/ItemCard'

const Home = () => {
  const fakeItem = {
    name: 'Item name',
    price: 30,
    location: {
      city: 'Funchal',
      venue: 'Rua da Carreira',
    },
    image: 'url',
    sellerName: 'João José',
    createdAt: new Date('01/20/2020').toISOString(),
  }

  const fakeItem2 = {
    name: 'Item name',
    price: 30,
    location: {
      city: 'Funchal',
      venue: 'Rua da Carreira',
    },
    image: 'url',
    sellerName: 'João José',
    createdAt: new Date('01/20/2020').toISOString(),
  }

  const items = [fakeItem, fakeItem2]

  return (
    <Grid container gap={2}>
      {items.map((item, index) => (
        <Grid item key={index} xs={3}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  )
}
export default Home
