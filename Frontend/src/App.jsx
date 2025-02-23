import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './customcomponent/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import AppState from './context/AppState'
import Signup from './pages/Signup'
import SkinHealth from './pages/SkinHealth'
import AboutPage from './pages/AboutUs'

function App() {

  return (
    <AppState>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Navigate to={'/home'}/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/skinHealth' element={<SkinHealth/>}/>
        <Route path='/aboutUs' element={<AboutPage/>}/>
      </Routes>
    </BrowserRouter>
    </AppState>
  )
}

export default App
