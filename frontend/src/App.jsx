import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Edit from './pages/Edit'
import Userprofile from './pages/Userprofile'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {


  return (
    <>
    
    <Navbar />

    <Routes>

    <Route path='/' element={<Home/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/edit/:id' element={<Edit/>} />
    <Route path='/userprofile/:id' element={<Userprofile/>} />


    </Routes>
    
    
    </>
  )
}

export default App