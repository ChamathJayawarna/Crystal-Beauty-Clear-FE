import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/product-card'
import AdminPage from './pages/admin-page'
import LoginPage from './pages/login-page'


function App() {
  return (
    <BrowserRouter>
    <Routes path="/*">
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path="/admin/*" element={<AdminPage/>}></Route>
    <Route path="/" element={<h1>Home</h1>}></Route>
    <Route path="/*" element={<h1>404 NOT FOUND</h1>}></Route>

    </Routes>
    </BrowserRouter>
  )
  
}

export default App
