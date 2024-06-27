import { FC } from 'react'
import AppLayout from '@components/layouts/AppLayout'
import Home from '@components/templates/Home'
import Login from '@components/templates/Login'
import Products from '@components/templates/Products'
import SignUp from '@components/templates/SignUp'
import { Route, Routes } from 'react-router-dom'

const App: FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </AppLayout>
  )
}
export default App
