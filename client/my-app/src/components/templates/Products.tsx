import { Grid } from '@mui/material'
import AddNewItemCard from '@components/molecules/AddNewItemCard'
import AddNewItemModal from '@components/molecules/AddNewItemModal'
import ItemCard from '@components/molecules/ItemCard'
import useModal from '@hooks/useModal'

const Products = () => {
  const { open, handleOpen, handleClose } = useModal()

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
    <>
      <AddNewItemModal open={open} handleClose={handleClose} />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <AddNewItemCard title="Add new product" onClick={handleOpen} />
        </Grid>

        {items.map((item, index) => (
          <Grid item xs={3} key={index}>
            <ItemCard item={item} variant="seller" />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default Products
