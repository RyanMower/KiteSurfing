import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




function BecomeInstructor(props) {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(event){
    event.preventDefault();
    // SUBMIT DATA TO BACKEND HERE
    var { contactInfo, location, price } = document.forms[0];
    fetch("/becomeAnInstructor",{
      method: "POST",
      body: JSON.stringify({
        "pricing": price.value,
        "location": location.value,
        "contact-info": contactInfo.value,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        if (data.status === 'success') { 
          navigate("/SurfingLessons");
        }
        else{
          // Display Error Message Here
          navigate("/SurfingLessons");
        }
      })
      .catch(err => console.log(err));

  }

  useEffect(() => {
    fetch("/getLoggedInUser") 
      .then(resp => resp.json())
      .then(data => {
        if(data.email !== ""){
          setLoggedIn(true);
        }
        else{
          navigate("/login");
        }
      })
      .catch(err => console.log(err));
  }, []);


    return (
      <div className="BecomeInstructor">
        {loggedIn && 
        <form onSubmit={handleSubmit}>
          <div className="input-container bg-light border">
            <label>Contact Information (Public Name)</label>
            <input type="text" name="contactInfo" />
          </div>
          <div className="input-container bg-light border">
            <label>Location</label>
            <input type="text" name="location" />
          </div>
          <div className="input-container bg-light border">
            <label>Price</label>
            <input type="text" name="price" />
          </div>
          <input type="submit" value="submit"/>
        </form>
        }
      </div>

    );
  
}

export default BecomeInstructor;
