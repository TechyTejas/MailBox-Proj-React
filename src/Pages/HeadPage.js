import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js';
import { useState ,useRef, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function HeadPage() {
  // 
  const dispatch=useDispatch();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const email=localStorage.getItem("email");
  const subref=useRef();
  const mailref=useRef();


  const SubmitHandler = (event) => {
    event.preventDefault();
    const currentTime = new Date().toLocaleString(); // Get the current time
    const emailContent = editorState.getCurrentContent().getPlainText();
    const Mymail = email.replace("@", "").replace(".", ""); // we will post our data to this user first
    const visibility=true;
    const DataByMe={
      email:mailref.current.value,
      subject:subref.current.value,
      content:emailContent,
      time:currentTime,
      visibility:visibility   // for that green button in inbox
    }

    //  console.log(DataByMe)

   // this post req is from me to receiver email 
    fetch(`https://mailbox-ff62c-default-rtdb.firebaseio.com/send/${Mymail}.json`, {
      method: 'POST',
      body: JSON.stringify(DataByMe),
      headers: { 'Content-Type': 'application/json' },
    })
    
    const recmail=mailref.current.value;
    const MailByRec=recmail.replace("@", "").replace(".", "");
    const DataByReceiver={
      email:email,
      subject:subref.current.value,
      content:emailContent,
      time:currentTime,
      visibility:visibility    // for that green button in inbox
    }   
      // console.log(MailByRec)
     // this post req is from receiver to my email 
    fetch(`https://mailbox-ff62c-default-rtdb.firebaseio.com/receive/${MailByRec}.json`, {
      method: 'POST',
      body: JSON.stringify(DataByReceiver),
      headers: { 'Content-Type': 'application/json' },
    })
    mailref.current.value="";
    subref.current.value="";
    setEditorState(EditorState.createEmpty());
    toast.success('Sent Successfully',{position:"bottom-right",closeOnClick: true,
        pauseOnHover: false,theme: "colored",autoClose: 2000})
  }

  useEffect(() => {
     const token=localStorage.getItem("token")
     dispatch(authActions.isLogin(token))
     console.log("hii we ar loggin ing")
  }, [])
  
  return (
    <form onSubmit={SubmitHandler}>
    <div style={{ width: "98%",backgroundColor:"#F2F2F2" , marginLeft: "17.5px", fontWeight: "bold", border: "2px solid #ccc", borderRadius: "8px", padding: "8px" }}>
    <div style={{ marginLeft: "13px",backgroundColor:"#F2F2F2" }}>
      <label>TO:</label>
      <input style={{ marginLeft: "43px", }} type='email' ref={mailref} required />
      <br /> <br />
      <label>Subject:</label>
      <input style={{ marginLeft: "10px", }} ref={subref} required />
      <br /><br />
      <h3>Write Email</h3>
    </div>
      <div style={{ height: "23rem", border: "1px solid #ccc", borderRadius: "5px", padding: "10px", backgroundColor: "white" }}>
        <Editor
          editorState={editorState}
          toolbarClassName="flex"
          wrapperClassName="bg-white rounded p-3 focus:outline-none"
          editorClassName="w-full h-full"
          onEditorStateChange={onEditorStateChange}
          required
        />
      </div>
      <Button type="submit" style={{  marginTop: "10px"}}>Send <SendIcon/></Button>
    </div>
    </form>
  )
}

export default HeadPage