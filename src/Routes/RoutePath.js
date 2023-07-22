import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HeadPage from '../Pages/HeadPage'
import LoginForm from '../Login/LoginForm'
import Outbox from '../Pages/Outbox'
import Inbox from '../Pages/Inbox'
import ReadMail from '../Pages/ReadMail'

function RoutePath() {
  
  return (
    <>
    <Routes>
      <Route path="/home" element={<HeadPage/>} ></Route>
      <Route path="/" element={<LoginForm/>}></Route>
      <Route path="/Outbox" element={<Outbox/>}></Route>
      <Route path="/Inbox" element={<Inbox/>}></Route>
      <Route path="/read" element={<ReadMail/>}></Route>

    </Routes>
    </>
  )
}

export default RoutePath