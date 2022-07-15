import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import "../../Assets/Styles/Login.css";

function Login() {

  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const errors = {
    credentials: "Invalid Credentials",
  };

  const renderErrorMessage = (type) => {
    return (<div className="error">{errors[type]}</div>);
  }



  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, password} = document.forms[0];

    let data = JSON.stringify({email: email.value, password: password.value});

    fetch("/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: data,
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.status === "success"){
          console.log(data.status);
          setLoggedIn(true);
        }else{
          setIsSubmitted(true);
        }})
      .catch(err => console.log(err));
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div>{isSubmitted && renderErrorMessage("credentials")}</div>
        <div className="button-container">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  );
  

  useEffect(() => {      
    fetch("/getLoggedInUser")
      .then(resp => resp.json())
      .then(data => {
        if (data["email"] != ""){
          setLoggedIn(false);
        }
      })
      .catch(err => console.log(err));

  }, []);

  let display;

  if(loggedIn){
    display = <Navigate to="/" /> 
  }
  else{
    display = 
      <div className="Login">
        <div className="login-form">
          <div className="title">Sign In</div>
            {renderForm}
        </div>
      </div>
  }

  return (
    display
  );
}

export default Login;
