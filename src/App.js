import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './Login'
import Encoder from './Encoder'
import NotFound from './NotFound'

function App() {
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(localStorage.getItem('token') || '')
  }, [])

  const PrivateRoute = () => {
    const auth = token !== ''
    return auth ? <Outlet /> : <Navigate to="/" />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path='/encoder' element={<PrivateRoute />}>
          <Route exact path='/encoder' element={<Encoder token={token} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
