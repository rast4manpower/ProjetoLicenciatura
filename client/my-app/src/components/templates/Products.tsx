import { useState } from 'react'
import { Grid } from '@mui/material'
import AddNewItemCard from '@components/molecules/AddNewItemCard'
import AddNewItemModal, { Item } from '@components/molecules/AddNewItemModal'
import ItemCard from '@components/molecules/ItemCard'
import useModal from '@hooks/useModal'
import axios from 'axios'

const Products = () => {
  const { open, handleOpen, handleClose } = useModal()

  const [selectedItem, setSelectedItem] = useState<Item>()
  const [isLoading, setIsLoading] = useState(false)

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
  const fakeItem3 = {
    name: 'Item name',
    price: 30,
    address: 'Rua da Carreira',
    image: 'url',
    sellerName: 'João José',
    createdAt: new Date('01/20/2020').toISOString(),
  }

  const items = [fakeItem, fakeItem2, fakeItem3]

  const onSelectItem = (item: Item) => setSelectedItem(item)

  const onDeleteItem = async () => {
    setIsLoading(true)
    //colocar aqui o pedido correto
    await axios.post('http://localhost:3001/deleteProduct')
    setIsLoading(false)
  }

  return (
    <>
      <AddNewItemModal
        open={open}
        handleClose={handleClose}
        selectedItem={selectedItem}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3} minHeight={422}>
          <AddNewItemCard title="Add new product" onClick={handleOpen} />
        </Grid>

        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ItemCard
              item={item}
              variant="seller"
              handleSelectItem={onSelectItem}
              handleDeleteItem={onDeleteItem}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default Products
