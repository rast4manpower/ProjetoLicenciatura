import { StrictMode } from 'react'
import { AuthProvider } from '@providers/AuthProvider'
import NotificationProvider from '@providers/NotificationProvider'
import RequestsProvider from '@providers/RequestsProvider'
import ThemeRegistry from '@theme/ThemeRegistry'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ThemeRegistry>
      <NotificationProvider dense maxSnack={3} preventDuplicate>
        <Router>
          <RequestsProvider value={{ revalidateOnFocus: false }}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </RequestsProvider>
        </Router>
      </NotificationProvider>
    </ThemeRegistry>
  </StrictMode>,
)

