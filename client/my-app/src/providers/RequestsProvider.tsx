import { ReactNode } from 'react'
import { SWRConfig, SWRConfiguration } from 'swr'

type RequestsProviderProps = {
  children: ReactNode
  value: SWRConfiguration
}

const RequestsProvider = ({ children, value }: RequestsProviderProps) => (
  <SWRConfig value={value}>{children}</SWRConfig>
)

export default RequestsProvider
