import { type ReactNode, createContext, memo, useState, useEffect } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useNavigate, useLocation } from 'react-router-dom'

type User = {
  id: string
  username: string
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
  const { pathname } = useLocation()

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

      updateUser({ id: response.data.id, username: response.data.username })
      enqueueSnackbar('Login successful', { variant: 'success' })
      navigate('/')
    } catch (error: any) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    }
  }

  const logout = async () => {
    updateUser(null)
    if( pathname === '/products') navigate('/')
  }

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

      updateUser({ id: response.data.id, username: response.data.username })
      enqueueSnackbar('Sign up successful', { variant: 'success' })
      navigate('/')
    } catch (error: any) {
      console.log(error)
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    }
  }

  const updateUser = (user: User|null) => {
    setUser(user)
    localStorage.setItem("auth", JSON.stringify(user))
  }
  

  useEffect(() => {
    const user = localStorage.getItem("auth")
    setUser(user ? JSON.parse(user) : null)
  }, [])

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
