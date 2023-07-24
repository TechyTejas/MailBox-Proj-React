import React from "react";
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function Sidebar() {
    const navigate=useNavigate();
    const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
         <img onClick={handleShow}style={{ marginLeft: "20px", width: "70px" }} src="https://banner2.cleanpng.com/20180720/ixe/kisspng-computer-icons-email-icon-design-equipo-comercial-5b525b3cdb7d21.311695661532123964899.jpg" alt='logo' />

      <Offcanvas show={show} onHide={handleClose} style={{ width: "15rem" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >MailBox </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body style={{ position: "relative" }}>
          <div style={{ marginRight: "10%", position: "sticky" }}>
          <h1 style={{textAlign:"right"}}>Welcome</h1>
          <ul style={{marginBottom:"10px",marginRight:"30px",marginLeft:"20px"}}>
            {isLoggedIn && <Button
                style={{
                  fontSize: "20px",
                  color: "black",
                  background: "linear-gradient(to right, #fcf9bd, #f908cd)",
                  boxShadow: "0px 2px 7px -2px rgba(0, 0, 0, 0.75)",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  marginBottom: "15px",
                  marginTop: "15px",
                  marginLeft: "px",
                  padding: "10px",
                }}
                onClick={()=>{navigate("/home")}}>
                Compose+
              </Button> }
            
            {isLoggedIn && <li style={{marginBottom:"10px"}} onClick={() => navigate("/Inbox")}><MarkEmailUnreadOutlinedIcon/> Inbox</li> }
            {isLoggedIn &&  <li style={{marginBottom:"10px"}} onClick={() => navigate("/Outbox")}><ForwardToInboxOutlinedIcon/> Outbox</li> }
            {isLoggedIn &&  <li style={{marginBottom:"10px"}}><MoveToInboxOutlinedIcon/> Spam</li> }
            {isLoggedIn &&  <li style={{marginBottom:"10px"}}><DeleteOutlinedIcon/> Delete</li> }

              </ul>
             
          </div>
          <div style={{ position: "absolute", bottom: 0, textAlign:"right" }}>Made with <FavoriteOutlinedIcon style={{color:"red"}}/> by Tejas</div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
