import { Box } from '@mui/material'
import ItemCard from '@components/molecules/ItemCard'

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

  return (
    <Box>
      <ItemCard item={fakeItem} />
    </Box>
  )
}
export default Products
