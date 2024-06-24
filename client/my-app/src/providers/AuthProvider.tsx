import { type ReactNode, createContext, memo, useState } from 'react'

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
  }) => void
  logout: () => void
  signUp: ({
    username,
    password,
    email,
  }: {
    username: string
    email: string
    password: string
  }) => void
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = memo(({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  const login = ({
    username,
    password,
  }: {
    username: string
    password: string
  }) =>
    //TODO fazer pedido ao servidor

    setUser({ email: 'email', username: username })

  const logout = () => setUser(null)

  const signUp = ({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }) => {
    //TODO fazer registo no servidor
    console.log('username: ', username)
    console.log('email: ', email)
    console.log('password: ', password)
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
