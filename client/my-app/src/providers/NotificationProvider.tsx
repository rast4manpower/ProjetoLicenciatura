import { ReactNode } from 'react'
import { SnackbarProvider, SnackbarProviderProps } from 'notistack'

type NotificationProviderProps = SnackbarProviderProps & {
  children: ReactNode
}

const NotificationProvider = ({
  children,
  ...props
}: NotificationProviderProps) => (
  <SnackbarProvider {...props}>{children}</SnackbarProvider>
)

export default NotificationProvider
