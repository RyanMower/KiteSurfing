import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function SurfingLessons() {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);

  function handleSubmit(event){
    event.preventDefault();
    // Requery data from server here
    //var { name, location, price, distance } = document.forms[0];
    var { name } = document.forms[0];
    let location = "";
    let price = "";
    let distance = "";
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="John Doe" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Filter 
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate("/become-instructor")}>Become an Instructor</Button>
        </Form> 
      </div>
      {lessons.map((lesson, index) => (
      <div >
        <Card style={{ width: '50rem'}} className="mx-auto" key={index}>
          <Card.Header className="bg-dark text-white">{lesson["contact_info"]} </Card.Header>
          <Card.Body>
            <Card.Title>{lesson["location"]}</Card.Title>
            <Card.Text>
              {lesson["pricing"]}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      ))}
    </div>
  );
}

export default SurfingLessons;



