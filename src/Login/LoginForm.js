import { useRef, useState} from "react";
import classes from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const dispatch=useDispatch()
  const navigate=useNavigate();

  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const CnfmpasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    console.log(enteredEmail, enteredPassword);
    localStorage.setItem('email', enteredEmail);

    
    
    if (isLogin) {
    let  url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNAXCYTMM8nomIT-T7v_v1Af6RLuVy5Dc";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        //here we passing data
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          console.log("login sussesssfulyy guysss")
          
          return response.json();
        } else {
          //The response holds error
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data)
        dispatch(authActions.isLogin(data.idToken))
        navigate('/home')
        
      })
      .catch((err) => {
        alert(err.message);
      });

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    toast.success('Login Successfully',{position:"bottom-right",closeOnClick: true,
        pauseOnHover: false,theme: "colored",autoClose: 1000,})
  }
     
  else {
    let  url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNAXCYTMM8nomIT-T7v_v1Af6RLuVy5Dc";
        const enterCnfmpassword = CnfmpasswordRef.current.value;

        if(enterCnfmpassword === enteredPassword){
          fetch(url, {
              method: "POST",
              body: JSON.stringify({
                //here we passing data
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                setIsLoading(false);
                if (response.ok) {
                  return response.json();
                } else {
                  //The response holds error
                  return response.json().then((data) => {
                    let errorMessage = "Authentication failed!";
                    throw new Error(errorMessage);
                  });
                }
              })
              .then((data) => {
                 
                //  dispatch(authActions.isLogin(data.idToken))
                 navigate('/home')
                
              })
              .catch((err) => {
                alert(err.message);
              });
        }else{
          alert("Both Password should be same..!")
          setIsLoading(false)
        }
     CnfmpasswordRef.current.value="";
    }
    

    emailInputRef.current.value = "";
    
    passwordInputRef.current.value = "";
  };

  const forgotPassHandler = () => {
     
  }

  
  

  return (
    <>
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
          {isLogin && (
            <button
              style={{
                textDecoration: "underline",
                border: "none",
                background: "none",
              }}
              onClick={forgotPassHandler}
            >
              forgot password
            </button>
          )}

          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                ref={CnfmpasswordRef}
                required
              />
            </div>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
    </>
  );
}

export default LoginForm;
