import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar.jsx'
import Builder from './pages/Builder.jsx'
import Billing from './pages/Billing.jsx'
import { Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer.jsx'

export const serverUrl = import.meta.env.VITE_SERVER_URL;
// console.log(serverUrl);

const App = () => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fetchMe = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/user/me", {
          withCredentials: true
        })
        // console.log(res.data)
        setUser(res.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false) 
      }
    }

    fetchMe()

  }, [])


  return (
    <>
    <Toaster position='top-center'/>
    <Routes>

      <Route path='/login' element={<Login user={user} setUser={setUser}/>} />

      <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
        <Navbar setUser={setUser} user={user} />
        <Routes>
          <Route path='/' element={<Home user={user}/>} />
          <Route path='/builder' element={<Builder user={user} setUser={setUser}/>} />
          <Route path='/billing' element={<Billing user={user} setUser={setUser}/>} />

          <Route path='*' element={<Navigate to="/" replace/> }/>
        </Routes>
        <Footer />

      </ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
