import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import AddNewItemCard from '@components/molecules/AddNewItemCard'
import AddNewItemModal from '@components/molecules/AddNewItemModal'
import ItemCard from '@components/molecules/ItemCard'
import useAuth from '@hooks/useAuth'
import useModal from '@hooks/useModal'
import axios from 'axios'
import useSWR from 'swr'

type Item = {
  id: string
  name: string
  image: string
  address: string
  price: number
  sellerName: string
  createdAt: string
  description: string
  category: string
  brand: string
}

const Products = () => {
  const { open, handleOpen, handleClose } = useModal()

  const [selectedItem, setSelectedItem] = useState<Item | null>()
  const [shouldUpdate, setShouldUpdate] = useState(true)
  const { user } = useAuth()

  const { data, error } = useSWR(
    user ? ['getUserProducts', user.id, shouldUpdate] : null,
    ([_, sellerId]) =>
      axios.get(`http://localhost:3001/products/sellerId/${sellerId}`),
  )

  const onSelectItem = (item: Item) => {
    setSelectedItem(item)
  }

  const onDeleteItem = async (productId: string) => {
    await axios.delete(`http://localhost:3001/products/${productId}`)
    updateItems()
  }

  const updateItems = () => setShouldUpdate((prev) => !prev)

  const onCloseModal = () => {
    handleClose()
    setSelectedItem(null)
  }

  useEffect(() => {
    if (selectedItem) handleOpen()
  }, [selectedItem])

  return (
    <>
      <AddNewItemModal
        open={open}
        handleClose={onCloseModal}
        selectedItem={selectedItem}
        mutate={updateItems}
      />
      {error ? (
        <Typography> Error!!!</Typography>
      ) : data ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3} minHeight={422}>
            <AddNewItemCard title="Add new product" onClick={handleOpen} />
          </Grid>

          {data.data.map((item: Item, index: number) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <ItemCard
                item={item}
                variant="seller"
                handleSelectItem={onSelectItem}
                handleDeleteItem={() => onDeleteItem(item.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography> Esta a carregar</Typography>
      )}
    </>
  )
}
export default Products
