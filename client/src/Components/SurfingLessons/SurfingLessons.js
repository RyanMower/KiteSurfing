import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

function SurfingLessons() {

  const [display, setDisplay] = useState();
  const [lessons, setLessons] = useState([]);

  function handleSubmit(event){
    event.preventDefault();
    // Requery data from server here
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
    <div className="SurfingLessons">
      {lessons.map(lesson => (
        <Card key={lesson}>
          <Card.Header>{lesson["fname"]} {lesson["lname"]}</Card.Header>
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



