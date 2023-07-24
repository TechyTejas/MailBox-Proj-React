 
import { useEffect, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';

function Outbox() {
  const dispatch = useDispatch();

  const [details, setDetails] = useState([]);
  const email = localStorage.getItem("email");
  const fetchemail = email.replace("@", "").replace(".", "");

  async function fetchItems() {
    try {
      // Fetching entered data from Firebase Realtime Database
      const response = await fetch(
        `https://mailbox-ff62c-default-rtdb.firebaseio.com/send/${fetchemail}.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch expenses data");
      }

      const data = await response.json();

      const FetchDetails = [];
      for (const key in data) {
        FetchDetails.push({
          id: key,
          time: data[key].time,
          subject: data[key].subject,
          email: data[key].email,
        });
      }
      setDetails(FetchDetails);
    } catch (error) {
      console.log("Error occurred while fetching expenses data:", error);
    }
  }

  const DeleteMailHandler = (itemId) => {
    fetch(
      `https://mailbox-ff62c-default-rtdb.firebaseio.com/send/${fetchemail}/${itemId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Expense data deleted successfully!");
          fetchItems(); // Fetch the updated data after deleting an item
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(authActions.isLogin(token));
    fetchItems();
  }, []);

  const boxShadowStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
  };

  return (
 
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
           
              <div style={{ flex: 1 }}>
              To : {item.email}
              </div>
              <div style={{ flex: 2 }}>
                {item.subject}
              </div>
              <div style={{ flex: 1 }}>
                {item.time}
              </div>
              <div style={{ flex: 1 }}>
                <DeleteOutlinedIcon onClick={() => DeleteMailHandler(item.id)} />
                </div>
            
            </li>
          </ul>
        ))}
      </div>
  
  );
}

export default Outbox;
