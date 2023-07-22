import { useState, useEffect  } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
 

function Inbox() {
 

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
  

  const  ReadMailHandler=()=>{
    navigate("/read")
  }
  useEffect(() => {
    fetchItems();
  
  }, []);


  return (
    <div>
      <h1>hii welcome in inbox {email}</h1>
      <div
        style={{
          width: "100%",
          border: "2px solid black",
          padding: "10px 10px",
        }}
      >
        {details.map((item, index) => (
          <ul key={index}>
            <li>
              {item.visibility && (
                <VisibilityIcon
                  className="text-blue-500 mx-2"
                  onClick={() => HideBtnHandler(item.id)}
                />
              )}
              BY: {item.email}----------{item.subject}----------{item.time}
              {
                !item.visibility && <button style={{backgroundColor:"orange" , marginLeft:"20px"}} onClick={()=>ReadMailHandler(item.id)}>Read Again</button>
              }
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Inbox;
