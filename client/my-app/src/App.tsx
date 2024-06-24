import { FC } from 'react'
import AppLayout from '@components/layouts/AppLayout'
import About from '@components/templates/About'
import Contact from '@components/templates/Contact'
import Home from '@components/templates/Home'
import Products from '@components/templates/Products'
import SignUp from '@components/templates/SignUp'
import Login from '@components/templates/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App: FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home title="Home" subtitle="Subtitle" />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/teste" element={<Contact />} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AppLayout>
    </Router>
  )
}
export default App
