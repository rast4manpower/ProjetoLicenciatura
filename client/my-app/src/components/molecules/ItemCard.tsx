import { Box, Card, Grid, Typography } from '@mui/material'
import { PlaceOutlined, CalendarTodayRounded } from '@mui/icons-material'
import Price from '@components/atoms/Price'
import { format } from 'date-fns'
import OverflowBox from './OverflowBox'

type ItemCardProps = {
  item: {
    name: string
    image: string
    location: {
      city: string
      venue: string
    }
    price: number
    sellerName: string
    createdAt: string
  }
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Box maxWidth={500}>
      <Card>
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
            src="https://source.unsplash.com/featured/"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
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
              text={`${item.location.venue}, ${item.location.city}`}
              color="text.secondary"
            />
          </Box>

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
        </Grid>
      </Card>
    </Box>
  )
}

export default ItemCard
