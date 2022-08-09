import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ForgotPasswordUpdate(props) {
  const navigate = useNavigate();
  const { token } = useParams();

  const [data, setData] = useState({
    password1: "",
    password2: "",
  });

  function handleSubmit(event){
    event.preventDefault();
    // SUBMIT DATA TO BACKEND HERE
    fetch("/update-password",{
      method: "POST",
      body: JSON.stringify({
        "new-password1": data["password1"],
        "new-password2": data["password1"],
        "token": token,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        // Add feedback status message here
        if (data.status == "success"){
          navigate("/login");
        }
        else{
          navigate("/login");
        }
      })
      .catch(err => console.log(err));

  }

  function handleChangePassword1(event) {
     setData({
     ...data,
     password1: event.target.value
   });
  }

  function handleChangePassword2(event) {
     setData({
     ...data,
     password2: event.target.value
   });
  }
  return (
    <div className="ForgotPasswordUpdate">
      <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
            New Password:
            <input type="password" value={data["password1"]} onChange={handleChangePassword1}/>
            </label>
          </div>
          <div>
            <label>
            Re-type New Password:
            <input type="password" value={data["password2"]} onChange={handleChangePassword2}/>
            </label>
          </div>
          <input type="submit" value="Update Password" />
        </form>
    </div>
  );
}

export default ForgotPasswordUpdate;
