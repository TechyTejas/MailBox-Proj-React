import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

function Outbox() {
    const[details,setDetails]=useState([]);
    const email=localStorage.getItem("email");
    const fetchemail=email.replace("@", "").replace(".", "");

    async function fetchItems() {
        // Fetching entered data from Firebase Realtime Database
        fetch(
          `https://mailbox-ff62c-default-rtdb.firebaseio.com/send/${fetchemail}.json`
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
              });
            }
            setDetails(FetchDetails);
          
          })
          .catch((error) => {
            console.log("Error occurred while fetching expenses data:", error);
          });
      }


      const DeleteMailHandler = (itemId) => {
        fetch(
          `https://mailbox-ff62c-default-rtdb.firebaseio.com/send/${fetchemail}/${itemId}.json`,
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

     useEffect(() => {
       fetchItems(); 
     }, [])
     
  return (
    <div>
        <h1>hii welcome in inbox {email}</h1>
        <div style={{width:"100%",border:"2px solid black",padding:"10px 10px"}}>
        {details.map((item, index) => (
            <ul key={index}>
             <li>To  :   {item.email}----------{item.subject}----------{item.time} -<DeleteIcon onClick={() => DeleteMailHandler(item.id)}/></li> 
            </ul>
            ))}
        </div>
    </div>
  )
}

export default Outbox