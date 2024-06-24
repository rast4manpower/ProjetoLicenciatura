import { Box, Grid } from '@mui/material'
import ItemCard from '@components/molecules/ItemCard'
import AddNewItemCard from '@components/molecules/AddNewItemCard'

const Products: React.FC = () => {
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
  const fakeItem3 = {
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

  const items = [fakeItem, fakeItem2, fakeItem3]

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <AddNewItemCard
          title="Add new product"
          onClick={() => console.log('clicked')}
        />
      </Grid>

      {items.map((item, index) => (
        <Grid item xs={3} key={index}>
          <ItemCard item={item} variant="seller" />
        </Grid>
      ))}
    </Grid>
  )
}
export default Products
