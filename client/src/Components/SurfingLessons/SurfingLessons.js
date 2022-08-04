import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

function SurfingLessons() {

  const [lessons, setLessons] = useState([]);

  function handleSubmit(event){
    event.preventDefault();
    // Requery data from server here
    var { name, location, price, distance } = document.forms[0];
    fetch("/getLessons",{
      method: "POST",
      body: JSON.stringify({
        "name": name.value,
        "location": location.value,
        "price": price.value,
        "distance": distance.value,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        setLessons(data["data"]);
      })
      .catch(err => console.log(err));
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
        setLessons(data["data"]);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="SurfingLessons d-grid gap-3">
      <div className="form p-2 bg-light border">
        <form onSubmit={handleSubmit}>
          <div className="input-container bg-light border">
            <label>Name</label>
            <input type="text" name="name" />
          </div>
          <div className="input-container bg-light border">
            <label>Location</label>
            <input type="text" name="location" />
          </div>
          <div className="input-container bg-light border">
            <label>Price</label>
            <input type="text" name="price" />
          </div>
          <div className="input-container bg-light border">
            <label>Distance Willing to Travel</label>
            <input type="text" name="distance" />
          </div>
          <input type="submit" value="filter"/>
        </form>
      </div>
      {lessons.map((lesson, index) => (
        <Card key={index}>
          <Card.Header className="bg-dark text-white">{lesson["fname"]} {lesson["lname"]}</Card.Header>
          <Card.Body>
            <Card.Title>{lesson["location"]}</Card.Title>
            <Card.Text>
              {lesson["pricing"]}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default SurfingLessons;



