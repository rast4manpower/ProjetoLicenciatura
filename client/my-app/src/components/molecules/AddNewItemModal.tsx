import { ChangeEvent, useState } from 'react'
import {
  Card,
  Dialog,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import { fileToBase64 } from '@utils/file'

type AddNewItemModalProps = {
  open: boolean
  handleClose: () => void
}

const AddNewItemModal = ({ open, handleClose }: AddNewItemModalProps) => {
  const defaultState: {
    name: string
    description: string
    price: string
    image: File | undefined
    address: string
  } = {
    name: '',
    description: '',
    price: '',
    image: undefined,
    address: '',
  }
  const [product, setProduct] = useState(defaultState)

  const handleAccountChange = (
    property: 'name' | 'description' | 'address',
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
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
      const result = { ...product, image: await fileToBase64(product.image) }
      //fazer pedido para a api
      console.log(result)
    }
  }

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <Card sx={{ padding: 3 }}>
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
