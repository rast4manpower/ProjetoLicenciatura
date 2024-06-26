import { type ReactNode, createContext, memo, useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

type User = {
  username: string
  email: string
}

type AuthContextValue = {
  user: User | null
  login: ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => Promise<void>
  logout: () => Promise<void>
  signUp: ({
    username,
    password,
    email,
  }: {
    username: string
    email: string
    password: string
  }) => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = memo(({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const login = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      })
      setUser({ email: 'email', username: username })
      enqueueSnackbar('Login successful', { variant: 'success' })
      navigate('/')
    } catch (error) {
      enqueueSnackbar('Invalid credentials', { variant: 'error' })
    }
  }

  const logout = async () => setUser(null)

  const signUp = async ({
    username,
    password,
    email,
  }: {
    username: string
    password: string
    email: string
  }) => {
    try {
      const response = await axios.post('http://localhost:3001/auth', {
        username,
        password,
        email,
      })
      setUser({ email: 'email', username: username })
      enqueueSnackbar('Sign up successful', { variant: 'success' })
      navigate('/')
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
})

export default AuthContext
