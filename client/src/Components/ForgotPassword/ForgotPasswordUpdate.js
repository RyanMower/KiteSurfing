import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ForgotPasswordUpdate(props) {
  const navigate = useNavigate();
  const { token } = useParams();

  const [data, setData] = useState({
    email: "",
  });

  function handleSubmit(event){
    event.preventDefault();
    // SUBMIT DATA TO BACKEND HERE
    /*
    fetch("/resetPassword",{
      method: "POST",
      body: JSON.stringify({
        email: data["email"],
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        console.log(data); 
        //navigate("/login");
        if (data.status === 'success') { 
          navigate("/login");
        }
        else { 
          if (data.reason === "email-exists"){
            //navigate("/reset-password");
            navigate("/");
            return;
          }
          console.log(data.reason);
        } 
      })
      .catch(err => console.log(err));
      */

  }
/*
  function handleChangeEmail(event) {
     setData({
     ...data,
     email: event.target.value
   });
  }
  */
  return (
    <div className="ForgotPasswordUpdate">
      <h1>Reset Password</h1>
      <p>{token}</p>
          {/*
        <form onSubmit={handleSubmit}>
          <div>
            <label>
            Email:
            <input type="email" value={data["email"]} onChange={handleChangeEmail}/>
            </label>
          </div>
          <input type="submit" value="Send Password Reset Link" />
        </form>
        */}
    </div>
  );
}

export default ForgotPasswordUpdate;
