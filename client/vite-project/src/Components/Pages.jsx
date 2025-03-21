import React from 'react'
import App from './App'
import Register from "./Register"
import { Router } from 'express'
import { Route } from 'react-router-dom'


function Pages() {

  return (
    <Router>
    <Routes>
    <Route path="/register" element={<Register />} />
    </Routes>
    <div>
    </div>
    </Router>
  )
}

export default Pages