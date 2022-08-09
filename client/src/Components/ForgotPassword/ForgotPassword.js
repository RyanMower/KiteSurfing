import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

  function handleSubmit(event){
    event.preventDefault();
    // SUBMIT DATA TO BACKEND HERE
    fetch("/resetPassword",{
      method: "POST",
      body: JSON.stringify({
        email: data["email"],
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        navigate("/login");
      })
      .catch(err => console.log(err));

  }

  function handleChangeEmail(event) {
     setData({
     ...data,
     email: event.target.value
   });
  }

  return (
    <div className="ForgotPassword">
      <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
            Email:
            <input type="email" value={data["email"]} onChange={handleChangeEmail}/>
            </label>
          </div>
          <input type="submit" value="Send Password Reset Link" />
        </form>
    </div>
  );
}

export default ForgotPassword;
