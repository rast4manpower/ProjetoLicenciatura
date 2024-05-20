import { EuroRounded, SvgIconComponent } from '@mui/icons-material'

export type Currency = 'EUR'

type CurrencyInfo = {
  symbol: string
  name: string
  flag: string
  Icon: SvgIconComponent
}

const currencies: Record<Currency, CurrencyInfo> = {
  EUR: {
    symbol: '€',
    name: 'Euro (EUR)',
    flag: 'https://flagcdn.com/w40/eu.png',
    Icon: EuroRounded,
  },
}

export const moneyToString = (
  value: number,
  currency: Currency,
  precision: 0 | 1 | 2 = 2,
) => `${currencies[currency].symbol}${value.toFixed(precision)}`
