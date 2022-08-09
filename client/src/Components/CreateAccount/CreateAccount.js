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

  const [validPassError, setValidPassError] = useState(false);
  const [passMatchError, setPassMatchError] = useState(false);

  const errors = {
    invalidPass: "<div>Passwords don't meet criterion.\n\tAt least 10 Characters\n\tOne symbol from ~`!@#$%^&*()_-+={[}]|:;<,>.?\n\tOne Number\n\tMust Match",
    pass_dont_match: "Passwords don't match",
  };

  const renderErrorMessage = () => {
    let validPassErrorJSX = (
      <>
        <div>Passwords don't meet criterion</div>
        <ul>
          <li>At least 10 Characters</li>
          <li>One Number</li>
          <li>One symbol from {`~\`!@#$%^&*()_-+={[}]|:;<,>.?`}</li>
          <li>Password Must Match</li>
        </ul>
      </>
    );

    let matchPassErrorJSX = (
      <>Passwords Must Match</>
    );

    let errMsg; 
    if (passMatchError){
      console.log("setting Match error");
      errMsg = (<div className="error">{matchPassErrorJSX}</div>);
    }
    else if (validPassError){
      console.log("setting Valid error");
      errMsg = (<div className="error">{validPassErrorJSX}</div>);
    }
    else{
      errMsg = (<></>);
    }
    return errMsg
  }


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
    setPassMatchError(false);
    setValidPassError(false);

    if (data["password1"] !== data["password2"]){
      setPassMatchError(true);
      return;
    }

    if(!(isValidPassword(data["password1"]))){
      setValidPassError(true);
      return;
    }
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
            <input type="email" value={data["email"]} onChange={handleChangeEmail} requried/>
            </label>
          </div>
          <div>
            <label>
            First Name:
            <input type="text" value={data["fname"]} onChange={handleChangeFname} required/>
            </label>
          </div>
          <div>
            <label>
            Last Name:
            <input type="text" value={data["lname"]} onChange={handleChangeLname} required/>
            </label>
          </div>
          <div>
            <label>
            Phone Number:
              <input type="tell" value={data["number"]} onChange={handleChangeNumber} required/>
            </label>
          </div>
          <div>
            <label>
            Password:
            <input type="password" value={data["password1"]} onChange={handleChangePassword1} required/>
            </label>
          </div>
          <div>
            <label>
            Re-Enter Password:
            <input type="password" value={data["password2"]} onChange={handleChangePassword2} required/>
            </label>
          </div>
          <div>{renderErrorMessage()}</div>
          <input type="submit" value="Create Account" />
        </form>
      </div>

    );
  
}

export default CreateAccount;
