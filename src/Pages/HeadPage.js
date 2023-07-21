import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js';
import { useState ,useRef} from 'react'
import { Button } from 'react-bootstrap';


function HeadPage() {
  // 
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const email=localStorage.getItem("email");
  const subref=useRef();
  const mailref=useRef();


  const SubmitHandler = () => {
    const currentTime = new Date().toLocaleString(); // Get the current time
    const emailContent = editorState.getCurrentContent().getPlainText();
    const Mymail = email.replace("@", "").replace(".", ""); // we will post our data to this user first
    const DataByMe={
      email:mailref.current.value,
      subject:subref.current.value,
      content:emailContent,
      time:currentTime,
    }

    console.log(DataByMe);

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
    }
   
     // this post req is from receiver to my email 
    fetch(`https://mailbox-ff62c-default-rtdb.firebaseio.com/receive/${MailByRec}.json`, {
      method: 'POST',
      body: JSON.stringify(DataByReceiver),
      headers: { 'Content-Type': 'application/json' },
    })
    mailref.current.value="";
    subref.current.value="";
    setEditorState(EditorState.createEmpty());
  }
  return (
    <div>
      <h1>Welcome to MailBox {email}</h1>

      <div style={{width:"98%",marginLeft:"17.5px",fontWeight:"bold"}}>
        <div style={{marginLeft:"13px"}}>
      <label>TO:</label>
      <input style={{marginLeft:"43px"}} type='email' ref={mailref} required/>
      <br/> <br/>
      <label>Subject:</label>
      <input style={{marginLeft:"10px"}} ref={subref} required/>
      <br/><br/>
      <h3>Write Email</h3>
      </div>
      <div style={{height:"30rem"}}>
      <Editor
       editorState={editorState}
       toolbarClassName="flex"
       wrapperClassName="bg-white rounded p-3 focus:outline-none"
       editorClassName="w-full h-full"
       onEditorStateChange={onEditorStateChange}
       />
       </div>
       <Button variant="primary" style={{marginLeft:"13px"}} onClick={SubmitHandler}>Send</Button>
       </div>
    </div>
  )
}

export default HeadPage