import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function CreateAccount(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    fname: "",
    lname: "",
    number: "",
    password1: "",
    password2: "",
  });


  function isValidPassword(password){
    let symbol_used = false;
    let number_used = false;
    let numbers = "0123456789";
    let symbols = "~`!@#$%^&*()_-+={[}]|:;<,>.?"
    // Check if password length less than 10
    if (password.length < 10){
        return false;
    }
   
    // Loops over every letter in password
    for (let i = 0; i < password.length; i++){
        if (numbers.includes(password[i])){ // Checks if current letter is a number
            number_used = true;
        }
        if (symbols.includes(password[i])){
            symbol_used = true;
        }
    }
    return (number_used && symbol_used);
}


  function handleSubmit(event){
    event.preventDefault();
    // SUBMIT DATA TO BACKEND HERE
    fetch("/createAccount",{
      method: "POST",
      body: JSON.stringify({
        email: data["email"],
        "first-name": data["fname"],
        "last-name": data["lname"],
        "phone-number": data["number"],
        "password1": data["password1"],
        "password2": data["password2"],
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

  }
  function handleChangeEmail(event) {
     setData({
     ...data,
     email: event.target.value
   });
  }

  function handleChangeFname(event) {
     setData({
     ...data,
     fname: event.target.value
   });
  }
  function handleChangeLname(event) {
    setData({
     ...data,
     lname: event.target.value
   });
  }
  function handleChangeNumber(event) {
    setData({
     ...data,
     number: event.target.value
   });
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

  useEffect(() => {
  }, []);


    return (
      <div className="CreateAccount">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
            Email:
            <input type="email" value={data["email"]} onChange={handleChangeEmail}/>
            </label>
          </div>
          <div>
            <label>
            First Name:
            <input type="text" value={data["fname"]} onChange={handleChangeFname}/>
            </label>
          </div>
          <div>
            <label>
            Last Name:
            <input type="text" value={data["lname"]} onChange={handleChangeLname}/>
            </label>
          </div>
          <div>
            <label>
            Phone Number:
            <input type="tel" value={data["number"]} onChange={handleChangeNumber}/>
            </label>
          </div>
          <div>
            <label>
            Password:
            <input type="text" value={data["password1"]} onChange={handleChangePassword1}/>
            </label>
          </div>
          <div>
            <label>
            Re-Enter Password:
            <input type="text" value={data["password2"]} onChange={handleChangePassword2}/>
            </label>
          </div>
          <input type="submit" value="Create Account" />
        </form>
      </div>

    );
  
}

export default CreateAccount;
