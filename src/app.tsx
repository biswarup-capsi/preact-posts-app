import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.css'
import Home from './pages/home'
import Login from './pages/login'


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
