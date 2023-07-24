import { useState, useEffect  } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
 

function Inbox() {
 const dispatch=useDispatch();

  const navigate = useNavigate();
  const [details, setDetails] = useState([]);

  const email = localStorage.getItem("email");
  const receiveEmail = email.replace("@", "").replace(".", "");

  async function fetchItems() {
   
    // Fetching entered data from Firebase Realtime Database
    await fetch(
      `https://mailbox-ff62c-default-rtdb.firebaseio.com/receive/${receiveEmail}.json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch expenses data");
        }
      })
      .then((data) => {
        const FetchDetails = [];
        for (const key in data) {
          FetchDetails.push({
            id: key,
            time: data[key].time,
            subject: data[key].subject,
            email: data[key].email,
            visibility: data[key].visibility,
          });
        }
        // console.log(FetchDetails);
        setDetails(FetchDetails);
        console.log(
          FetchDetails[0].visibility + "here we are getting desc back"
        );
      })
      .catch((error) => {
        console.log("Error occurred while fetching expenses data:", error);
      });
  }


  const HideBtnHandler = async (itemId) => {
    try {
      // Set the local visibility state of the item to false
      const updatedDetails = details.map((item) =>
        item.id === itemId ? { ...item, visibility: false } : item
      );
      setDetails(updatedDetails);
      
      // Create a PUT request to update the visibility property of the specific item
      await fetch(
        `https://mailbox-ff62c-default-rtdb.firebaseio.com/receive/${receiveEmail}/${itemId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...details.find((item) => item.id === itemId),
            visibility: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/read");
    } catch (error) {
      console.error("Error updating visibility data in the database:", error);
    }
  };
  
  const DeleteMailHandler = (itemId) => {
    fetch(
        `https://mailbox-ff62c-default-rtdb.firebaseio.com/receive/${receiveEmail}/${itemId}.json`,
        {
          method: "DELETE",
        }
      ).then((response) => {
        if (response.ok) {
          console.log("Expense data deleted successfully!");
          fetchItems(); // Fetch the updated data after deleting an item
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
     
  
   
  const ReadMailHandler=()=>{
    navigate("/read")
  }

  
  useEffect(() => {
    const token=localStorage.getItem("token")
    dispatch(authActions.isLogin(token))
  fetchItems();
  }, []);
  
  const boxShadowStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  };

  return (
      <div>
        <h1>hii welcome in inbox {email}</h1>
        <div
          style={{
            width: "100%",
            border: "2px solid black",
            padding: "10px 10px",
            ...boxShadowStyle, // Apply the box shadow style
          }}
        >
          {details.map((item, index) => (
             <ul key={index} style={{ listStyle: "none", margin: "0", padding: "0" }}>
             <li style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>  {item.visibility && (
                   <VisibilityIcon
                    className="text-blue-500 mx-2"
                    onClick={() => HideBtnHandler(item.id)}
                  />
                )}
                </div>
               
                <div style={{ flex: 1 }}>
              By : {item.email}
              </div>
              <div style={{ flex: 2 }}>
                {item.subject}
              </div>
              <div style={{ flex: 1 }}>
                {item.time}
              </div>
              <div style={{ flex: 1 }}>
                {!item.visibility && (
                  <OpenInNewIcon onClick={() => ReadMailHandler(item.id)}>
                    Read Again
                  </OpenInNewIcon>
                )}
                <DeleteOutlinedIcon onClick={() => DeleteMailHandler(item.id)} />
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
}

export default Inbox;
