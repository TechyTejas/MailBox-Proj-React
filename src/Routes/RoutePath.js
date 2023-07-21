import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HeadPage from '../Pages/HeadPage'
import LoginForm from '../Login/LoginForm'
import Outbox from '../Pages/Outbox'
import Inbox from '../Pages/Inbox'

function RoutePath() {
  
  return (
    <>
    <Routes>
      <Route path="/home" element={<HeadPage/>} ></Route>
      <Route path="/" element={<LoginForm/>}></Route>
      <Route path="/Outbox" element={<Outbox/>}></Route>
      <Route path="/Inbox" element={<Inbox/>}></Route>

    </Routes>
    </>
  )
}

export default RoutePath