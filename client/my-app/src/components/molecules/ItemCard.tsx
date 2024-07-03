import { useState } from 'react'
import { Box, Card, Grid, IconButton, Menu, MenuItem } from '@mui/material'
import { PlaceOutlined, CalendarTodayRounded } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Price from '@components/atoms/Price'
import { format } from 'date-fns'
import OverflowBox from './OverflowBox'

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

type ItemCardProps = {
  item: Item
  variant?: 'buyer' | 'seller'
  handleSelectItem?: (item: Item) => void
  handleDeleteItem?: () => Promise<void>
}

const ItemCard = ({
  item,
  variant = 'buyer',
  handleSelectItem,
  handleDeleteItem,
}: ItemCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {handleSelectItem && handleDeleteItem && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleSelectItem(item)}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteItem}>Delete</MenuItem>
        </Menu>
      )}

      <Card sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'relative',
            height: 270,
            '&:hover': {
              transform: 'scale(1.1)',
            },
            transition: 'transform .3s',
          }}
        >
          <img
            alt="Event card"
            src={item.image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
        {variant === 'seller' && (
          <Box position="absolute" top={8} right={8}>
            <IconButton onClick={handleClick}>
              {' '}
              <MoreVertIcon />{' '}
            </IconButton>
          </Box>
        )}
        <Grid container p={2} direction="column" gap={1}>
          <OverflowBox
            minHeight={64}
            variant="h6"
            fontWeight="medium"
            displayLines={2}
            text={item.name}
          />
          <Box display="flex" gap={1} alignItems="center">
            <CalendarTodayRounded
              sx={{ color: 'action.active' }}
              fontSize="small"
            />
            <OverflowBox
              variant="body2"
              text={format(item.createdAt, 'dd MMMM yyyy')}
              color="text.secondary"
            />
          </Box>

          <Box display="flex" gap={1} alignItems="center">
            <PlaceOutlined sx={{ color: 'action.active' }} fontSize="small" />
            <OverflowBox
              variant="body2"
              text={item.address}
              color="text.secondary"
            />
          </Box>

          {variant === 'buyer' ? (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <OverflowBox
                variant="body2"
                text={
                  <>
                    Sold by{' '}
                    <Box component="span" fontWeight="bold">
                      {item.sellerName}
                    </Box>
                  </>
                }
                color="text.secondary"
              />
              <Price
                color="secondary.main"
                fontWeight="medium"
                amount={item.price}
                currency="EUR"
              />
            </Box>
          ) : (
            <Price
              color="secondary.main"
              fontWeight="medium"
              amount={item.price}
              currency="EUR"
            />
          )}
        </Grid>
      </Card>
    </>
  )
}

export default ItemCard
