import React from "react";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { useSelector } from "react-redux/es/hooks/useSelector";



function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(authActions.isLogout());
    navigate("/");
  };
  const email = localStorage.getItem("email");
if(email){
  var char = email[0];
}

  return (
    <>
      <ul
        style={{
          height: "4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ff781f",
          width: "100%",
          padding: "0 10px", // Add padding to all elements within the ul
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <li style={{ marginRight: "50px", marginLeft: "auto" }}>
            <Sidebar />
          </li>
          <li style={{ marginRight: "20px" }}>About</li>
          <li style={{ marginRight: "20px" }}>Contact</li>
          {isLoggedIn && (
            <>
              <li
                style={{ marginRight: "20px" }}
                onClick={() => navigate("/Inbox")}
              >
                Inbox
              </li>
              <li onClick={() => navigate("/Outbox")}>OutBox</li>
            </>
          )}
        </div>
        {isLoggedIn &&<div style={{ display: "flex", alignItems: "center" }}>
         <button
            style={{
              backgroundColor: "white",
              
              padding: "1rem",
              marginRight: "10px", // Add some spacing between "char" and "Logout" buttons
              borderRadius: "50%", // Make the button circular
              width: "2rem", // Set the width and height to the same value to maintain a circular shape
              height: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold", // Add some style to the text
              border: "2px solid black"
            }}
          >
            {char}
          </button>
          <button
            style={{
              backgroundColor: "white",
              fontWeight: "bold", // Add some style to the text
              padding: "0.2rem",
              border: "2px solid black"
            }}
            onClick={LogoutHandler}
          >
            Logout
          </button>
        </div>}
      </ul>
    </>
  );
}

export default Navbar;
