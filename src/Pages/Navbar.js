import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate=useNavigate()
    const LogoutHandler = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("email")
        navigate("/")
    }
  return (
    <div style={{ display: "flex", height: "4rem", alignItems: "center", backgroundColor: "#ff781f" }}>
      <span style={{ marginLeft: "20px", width: "70px" }}>
        <img src="https://banner2.cleanpng.com/20180720/ixe/kisspng-computer-icons-email-icon-design-equipo-comercial-5b525b3cdb7d21.311695661532123964899.jpg" alt='logo' />
      </span>
      <ul style={{ display: "flex", flexGrow: 1, margin: "0 20px" ,fontWeight:"bold",fontSize:"20px" }}>
        <li style={{ marginRight: "20px" }}>About</li>
        <li>Contact</li>
      </ul>
      <button style={{ marginRight: "30px", backgroundColor: "white", padding: "0.5rem" }} onClick={LogoutHandler}>Logout</button>
    </div>
  );
}

export default Navbar;
