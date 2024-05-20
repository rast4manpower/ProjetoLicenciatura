import { Typography, TypographyProps } from '@mui/material'
import { Currency, moneyToString } from '@utils/currency'

export type PriceProps = Omit<TypographyProps, 'children'> & {
  amount: number
  currency: Currency
  precision?: 0 | 1 | 2
}

const Price = ({
  amount,
  currency,
  precision = 2,
  ...typographyProps
}: PriceProps) => (
  <Typography {...typographyProps}>
    {moneyToString(amount, currency, precision)}
  </Typography>
)

export default Price
