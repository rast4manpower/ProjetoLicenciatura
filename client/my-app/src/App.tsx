import { FC } from 'react'
import AppLayout from '@components/layouts/AppLayout'
import About from '@components/templates/About'
import Contact from '@components/templates/Contact'
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
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </AppLayout>
  )
}
export default App
