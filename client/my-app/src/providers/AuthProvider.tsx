import { type ReactNode, createContext, memo, useState } from 'react'

type User = {
  name: string
  email: string
}

type AuthContextValue = {
  user: User | null
  login: ({ email, password }: { email: string; password: string }) => void
  logout: () => void
  signUp: ({
    nome,
    password,
    email,
  }: {
    nome: string
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

  const login = ({ email, password }: { email: string; password: string }) =>
    //TODO fazer pedido ao servidor

    setUser({ name: 'Joao', email: email })

  const logout = () => setUser(null)

  const signUp = ({
    nome,
    password,
    email,
  }: {
    nome: string
    email: string
    password: string
  }) => {
    //TODO fazer registo no servidor
    console.log('nome: ', nome)
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
