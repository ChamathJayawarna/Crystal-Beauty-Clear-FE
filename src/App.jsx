import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/product-card'
import AdminPage from './pages/admin-page'
import LoginPage from './pages/login-page'
import TestingPage from './pages/testing-page'
import { Toaster } from 'react-hot-toast'
import TestingImages from './pages/testingImages'
import RegisterPage from './pages/register-page'
import HomePage from './pages/home-page'
import { GoogleOAuthProvider } from '@react-oauth/google'



function App() {
  return (
    <GoogleOAuthProvider clientId="214210860151-b8gsocf6lf2dim2uansk6jtsj6hh5m37.apps.googleusercontent.com">
    <BrowserRouter>
    <Toaster position="top-center"/>
    <Routes path="/*">
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path="/admin/*" element={<AdminPage/>}></Route>
    <Route path="/register" element={<RegisterPage/>}></Route>
    <Route path="/*" element={<HomePage/>}></Route>

    <Route path="/testing" element={<TestingPage/>}></Route>
    <Route path="/testingImages" element={<TestingImages/>}></Route>
    </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
  
}

export default App
