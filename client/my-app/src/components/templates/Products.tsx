import { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import AddNewItemCard from '@components/molecules/AddNewItemCard'
import AddNewItemModal, { Item } from '@components/molecules/AddNewItemModal'
import ItemCard from '@components/molecules/ItemCard'
import useAuth from '@hooks/useAuth'
import useModal from '@hooks/useModal'
import axios from 'axios'
import useSWR from 'swr'

const Products = () => {
  const { open, handleOpen, handleClose } = useModal()

  const [selectedItem, setSelectedItem] = useState<Item>()
  const [isLoading, setIsLoading] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(true)
  const { user } = useAuth()

  const { data, error } = useSWR(
    user ? ['getUserProducts', user.id, shouldUpdate] : null,
    ([_, sellerId]) =>
      axios.get(`http://localhost:3001/products/sellerId/${sellerId}`),
  )

  const onSelectItem = (item: Item) => setSelectedItem(item)

  const onDeleteItem = async () => {
    setIsLoading(true)
    //colocar aqui o pedido correto
    await axios.post('http://localhost:3001/deleteProduct')
    setIsLoading(false)
  }

  const updateItems = () => setShouldUpdate((prev) => !prev)

  return (
    <>
      <AddNewItemModal
        open={open}
        handleClose={handleClose}
        selectedItem={selectedItem}
        mutate={updateItems}
      />
      {error ? (
        <Typography> Error!!!</Typography>
      ) : data ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} minHeight={422}>
            <AddNewItemCard title="Add new product" onClick={handleOpen} />
          </Grid>

          {data.data.map(
            (
              item: {
                name: string
                image: string
                address: string
                price: number
                sellerName: string
                createdAt: string
              },
              index: number,
            ) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ItemCard
                  item={item}
                  variant="seller"
                  handleSelectItem={onSelectItem}
                  handleDeleteItem={onDeleteItem}
                />
              </Grid>
            ),
          )}
        </Grid>
      ) : (
        <Typography> Esta a carregar</Typography>
      )}
    </>
  )
}
export default Products
