import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HeadPage from '../Pages/HeadPage'
import LoginForm from '../Login/LoginForm'

function RoutePath() {
  
  return (
    <>
    <Routes>
      <Route path="/home" element={<HeadPage/>} ></Route>
      <Route path="/" element={<LoginForm/>}></Route>
    </Routes>
    </>
  )
}

export default RoutePath