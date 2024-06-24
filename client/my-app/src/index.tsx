import { StrictMode } from 'react'
import NotificationProvider from '@providers/NotificationProvider'
import RequestsProvider from '@providers/RequestsProvider'
import ThemeRegistry from '@theme/ThemeRegistry'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ThemeRegistry>
      <NotificationProvider dense maxSnack={3} preventDuplicate>
        <RequestsProvider value={{ revalidateOnFocus: false }}>
          <App />
        </RequestsProvider>
      </NotificationProvider>
    </ThemeRegistry>
  </StrictMode>,
)

