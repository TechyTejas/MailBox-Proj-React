import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import HeadPage from '../Pages/HeadPage'
import LoginForm from '../Login/LoginForm'
import Outbox from '../Pages/Outbox'
import Inbox from '../Pages/Inbox'
import ReadMail from '../Pages/ReadMail'
import Sidebar from '../Pages/SideBar'

function RoutePath() {
  const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)

  return (
    <>
    <Routes>
      <Route path="/home" element={isLoggedIn ? (<HeadPage />) : 
          (<Navigate to="/" replace/>)}/>
      <Route path="/" element={<LoginForm/>}></Route>
      <Route path="/Outbox" element={<Outbox/>}></Route>
      <Route path="/Inbox" element={<Inbox/>}></Route>
      <Route path="/read" element={<ReadMail/>}></Route>
      <Route path="/navbar" element={<Sidebar/>}></Route>
    </Routes>
    </>
  )
}

export default RoutePath