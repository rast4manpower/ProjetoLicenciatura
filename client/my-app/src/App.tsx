import {useEffect } from 'react'
import AppLayout from '@components/layouts/AppLayout'
import Home from '@components/templates/Home'
import Login from '@components/templates/Login'
import Products from '@components/templates/Products'
import SignUp from '@components/templates/SignUp'
import { Route, Routes } from 'react-router-dom'

const App = () => {

  useEffect(() => {
    // Add a script tag for a specific external library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
  }, [])  

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
