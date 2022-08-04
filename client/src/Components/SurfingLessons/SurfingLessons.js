import React, { useState, useEffect } from "react";

function SurfingLessons() {

  const [lessons, setLessons] = useState([]);

  function handleSubmit(event){
    event.preventDefault();
    // SUBMIT DATA TO BACKEND HERE
    fetch("/update-password",{
      method: "POST",
      body: JSON.stringify({
        "name": "",
        "location": "",
        "distance": "",
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        // Update STATE HERE
      })
      .catch(err => console.log(err));

  }

  function handleChangeName(event) {
     setLessons({
     ...lessons,
     password1: event.target.value
   });
  }

  useEffect(() => {
    fetch("/getLessons",{
      method: "POST",
      body: JSON.stringify({
        "name": "",
        "location": "",
        "distance": "",
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        // Update STATE HERE
        console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="SurfingLessons">
    </div>
  );
}

export default SurfingLessons;



