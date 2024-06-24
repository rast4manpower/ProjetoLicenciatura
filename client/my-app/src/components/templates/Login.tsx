import React from 'react'
import { Button } from '@mui/material'
import useAuth from 'hooks/useAuth'

const Login = () => {
  const { login, logout } = useAuth()
  return (
    <div>
      <h1>Login</h1>
      <Button
        onClick={() => login({ email: 'abra@conas.pt', password: '1234' })}
      >
        Login
      </Button>
    </div>
  )
}
export default Login
