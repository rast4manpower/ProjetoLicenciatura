import { ChangeEvent, useState } from 'react'
import {
  Card,
  Dialog,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import axios from 'axios'
import useAuth from 'hooks/useAuth'
import { useSnackbar } from 'notistack'

export type Item = {
  name: string
  description: string
  price: string
  image: File | undefined
  address: string
  category: string
  brand: string
}

type AddNewItemModalProps = {
  selectedItem?: Item
  open: boolean
  handleClose: () => void
  mutate: () => void
}

const categories = [
  'Desporto',
  'Montanha',
  'Casual',
  'Mulher',
  'Homem',
  'Criança',
]

const brands = ['Nike', 'Adidas', 'North Face', 'Vans', 'New Balance']

const AddNewItemModal = ({
  selectedItem,
  open,
  handleClose,
  mutate,
}: AddNewItemModalProps) => {
  const defaultState: Item = selectedItem ?? {
    name: '',
    description: '',
    price: '',
    image: undefined,
    address: '',
    category: '',
    brand: '',
  }
  const [product, setProduct] = useState(defaultState)

  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()

  const handleAccountChange = (
    property: 'name' | 'description' | 'address' | 'category' | 'brand',
    event:
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>,
  ) => {
    setProduct((previous) => ({
      ...previous,
      [property]: event.target.value,
    }))
  }

  const handleCloseModal = () => {
    setProduct(defaultState)
    handleClose()
  }

  const handleSubmit = async () => {
    if (product.image) {
      const result = {
        ...product,
        sellerId: user?.id,
        sellerName: user?.username,
      }

      try {
        const response = await axios.post(
          'http://localhost:3001/products',
          result,
        )

        const formData = new FormData()
        formData.append('image', product.image)
        if (response.data.id) {
          await axios.put(
            `http://localhost:3001/products/image/${response.data.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
        }
        enqueueSnackbar('Product Created!', { variant: 'success' })
        if (response) {
          mutate()
          handleCloseModal()
        }
      } catch (error: any) {
        console.log('error', error)
        enqueueSnackbar(
          error.response.data.error ?? 'Something went very wrong',
          { variant: 'error' },
        )
      }
    }
  }

  return (
    <Dialog open={open}>
      <Card sx={{ padding: 3, overflow: 'auto' }}>
        <Grid container gap={3}>
          <Typography variant="h5">Sell your Item</Typography>
          <TextField
            onChange={(event) => handleAccountChange('name', event)}
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
          />

          <TextField
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files?.[0])
                return setProduct((previous) => ({
                  ...previous,
                  image: undefined,
                }))
              setProduct((previous) => ({
                ...previous,
                image: event.target.files?.[0],
              }))
            }}
            variant="outlined"
            required
            fullWidth
            type="file"
            id="image"
            name="image"
          />

          {product.image && (
            <img
              alt="Preview"
              src={URL.createObjectURL(product.image)}
              style={{ width: '100%', height: 200, objectFit: 'contain' }}
            />
          )}

          <TextField
            onChange={(event) => handleAccountChange('description', event)}
            variant="outlined"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            minRows={3}
          />
          <TextField
            onChange={(event) => {
              const value = event.target.value
              const reg = /^\d*(\.\d{0,2})?$/

              if (reg.test(value)) {
                setProduct((previous) => ({
                  ...previous,
                  price: value,
                }))
              }
            }}
            variant="outlined"
            required
            fullWidth
            value={product.price}
            id="price"
            label="Price"
            name="price"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{<EuroIcon />}</InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              value={product.category}
              id="category"
              label="Category"
              name="category"
              onChange={(event) => handleAccountChange('category', event)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="brand">Brand</InputLabel>
            <Select
              value={product.brand}
              id="brand"
              label="Brand"
              name="brand"
              onChange={(event) => handleAccountChange('brand', event)}
            >
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            onChange={(event) => handleAccountChange('address', event)}
            variant="outlined"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
          />

          <Button variant="contained" onClick={handleCloseModal}>
            Close
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            List product
          </Button>
        </Grid>
      </Card>
    </Dialog>
  )
}

export default AddNewItemModal
